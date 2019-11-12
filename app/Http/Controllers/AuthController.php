<?php

namespace App\Http\Controllers;

use OhMyBrew\ShopifyApp\Facades\ShopifyApp;
use OhMyBrew\ShopifyApp\Jobs\ScripttagInstaller;
use OhMyBrew\ShopifyApp\Jobs\WebhookInstaller;
use App\ShopOwner;
use App\Shop;
use Illuminate\Http\Request;
use OhMyBrew\ShopifyApp\Traits\AuthControllerTrait;
use App\Order;
use DB;

class AuthController extends Controller
{
    use AuthControllerTrait;

    protected function authenticationWithoutCode()
    {
        $shopDomain = session('shopify_domain');
        $api = ShopifyApp::api();
        $api->setShop($shopDomain);
        // Grab the authentication URL
        $api_redirect = urlencode(url(config('shopify-app.api_redirect')));
        if(config('shopify-app.mode')){
            $authUrl = $api->getAuthUrl(
                config('shopify-app.api_scopes'),
                url(config('shopify-app.api_redirect'))
            );
            $new_api_redirect = (!strpos(url(config('shopify-app.api_redirect')), "s:")) ? urlencode(substr_replace(url(config('shopify-app.api_redirect')), "s", 4, 0)) : $api_redirect;
        }else{
            $authUrl = $api->getAuthUrl(
                config('shopify-app.api_scopes'),
                config('shopify-app.domain')
            );
            $new_api_redirect = config('shopify-app.domain');
        }
        $scope = urlencode(config('shopify-app.api_scopes'));
        $key = config('shopify-app.api_key');
        // Do a fullpage redirect
        return view('auth.fullpage_redirect', [
            'scope' => $scope,
            'key' => $key,
            'api_redirect' => $new_api_redirect,
            'authUrl'    => $authUrl,
            'shopDomain' => $shopDomain,
        ]);
    }
    protected function authenticationWithCode()
    {
        $shop_domain = session('shopify_domain');
        $api = ShopifyApp::api();
        $api->setShop($shop_domain);

        // Check if request is verified
        if (!$api->verifyRequest(request()->all())) {
            // Not valid, redirect to login and show the errors
            return redirect()->route('login')->with('error', trans('label.Invalid_signature'));
        }
      
        // Save token to shop
        $shop = ShopifyApp::shop();
        if ($shop->trashed()) {
            $shop->restore();
            $shop->charges()->restore();
        }
        $shop->shopify_token = $api->requestAccessToken(request('code'));
        $shop->save();
        $id_shop = $shop->id;
        // Install webhooks and scripttags
        $this->installWebhooks();
        $this->installScripttags();

        // Run after authenticate job
        $this->afterAuthenticateJob();
        $shop = ShopifyApp::shop();
        $request = $shop->api()->request('GET', '/admin/shop.json');
        self::cloneOrder($id_shop, $shop_domain);
        $shop_owner_info = ShopOwner::getShopOwnerByDomain($request->body->shop->email);
        $id_shop_owner = !empty($shop_owner_info) ? $shop_owner_info->id : $this->updateShop($request->body->shop);
        $id_shop_owner ? $this->updateShopOwner($id_shop, $id_shop_owner) : '';
        // Go to homepage of app
        return redirect()->route('home');
    }

     /**
     * @param  object $shop
     * @return  int
     */
    private function updateShop($shop){
        $shop_owner = new ShopOwner();
        $shop_owner->email = $shop->email;
        $shop_owner->name = $shop->name;
        $shop_owner->phone = $shop->phone;
        $shop_owner->address = $shop->address1;
        $shop_owner->save();
        return $shop_owner->id;
    }

    /**
     * @param  int $id_shop
     * @param  int $id_shop_owner
     * @return boolean         
     */
    private function updateShopOwner($id_shop, $id_shop_owner){
        $shop = Shop::find($id_shop);
        $shop->id_shop_owner = $id_shop_owner;
        $shop->save();
    }

    public function uninstall(Request $request) {
        $shop_domain = request()->header('x-shopify-shop-domain');
        $shop_info = Shop::getShopByDomain($shop_domain);
        if($shop_info){
            DB::table('shops')->where('id',  $shop_info->id)->delete();
            DB::table('order')->where('id_shop',  $shop_info->id)->delete();
            DB::table('recent_order_setup')->where('id_shop',  $shop_info->id)->delete();
            DB::table('recent_visitors_setup')->where('id_shop',  $shop_info->id)->delete();
            DB::table('stock_tracking_setup')->where('id_shop',  $shop_info->id)->delete();
        }
    }

    public function cloneOrder($id_shop, $shop_domain){
        session(['shopify_domain' => $shop_domain]);
        $shop = ShopifyApp::shop();
        $orders = array_slice(($shop->api()->request('GET', '/admin/orders.json')->body->orders), 0, 10);
        if($orders){
            foreach($orders as $order){
                $order_clone = Order::getOrderById($order->id);
                if(empty($order_clone)){
                    $id_order_shopify = $order->id;
                    $customer_name = $order->customer->first_name;
                    $customer_last_name = $order->customer->last_name;
                    $customer_address = $order->customer->default_address->city;
                    $customer_country = $order->customer->default_address->country;
                    $product_img = array_shift($shop->api()->request('GET', '/admin/products/'.($order->line_items)[0]->product_id.'/images.json')->body->images)->src;
                    $product_name = ($order->line_items)[0]->title;
                    Order::saveOrder($id_shop, $id_order_shopify, $customer_name, $customer_address, $product_img, $product_name, $customer_last_name, $customer_country);
                }
            }
        }else{
            $product = array_shift($shop->api()->request('GET', '/admin/products.json')->body->products);
            $customer = array_shift($shop->api()->request('GET', '/admin/customers.json')->body->customers);

            $id_order_shopify = 0;
            $id_shop = $id_shop;
            $customer_name = isset($customer->first_name) ? $customer->first_name : config('shopify-app.demo_customer_first_name');
            $customer_last_name = isset($customer->last_name) ? $customer->last_name : config('shopify-app.demo_customer_last_name');
            $customer_address = isset($customer->default_address->city) ? $customer->default_address->city : config('shopify-app.demo_customer_address');
            $customer_country =  isset($customer->default_address->country) ? $customer->default_address->country : config('shopify-app.demo_customer_country');
            $product_img = isset($product->image->src) ? $product->image->src : '';
            $product_name = isset($product->title) ? $product->title : '';
            Order::saveOrder($id_shop, $id_order_shopify, $customer_name, $customer_address, $product_img, $product_name, $customer_last_name, $customer_country);
        }
    }
}

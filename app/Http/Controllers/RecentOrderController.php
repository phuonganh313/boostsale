<?php


namespace App\Http\Controllers;
use OhMyBrew\ShopifyApp\Facades\ShopifyApp;
use Illuminate\Http\Request;
use App\Shop;
use App\RecentOrder;
use App\Order;
use DB;

class RecentOrderController extends Controller
{
    public function index(){
        return view('app');
    }

    public function validateData($request)
    {
        $errors = array();
        $validator = \Validator::make($request->all(), [
            'content' =>'required', 
            'background' => 'required', 
            'text_color' => 'required', 
            'purchasing_time' => 'required', 
            'product_name_color' => 'required', 
            'customer_name_color' =>'required', 
        ]);

        if($validator->fails()){
            $errors = $validator->errors();
        }

        return $errors;
    }

    /**
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function save(Request $request)
    {
        $errors = $this->validateData($request);
        $result = '';

        if(!$errors)
        {
            $shop_info = Shop::getShopByDomain($request->shopify_domain);
            $shop = $shop_info ? Shop::find($shop_info->id) : null;
            
            if($shop && $shop->recentOrderSetup){
                $result = $shop->recentOrderSetup->update($request->all());
                
            }else{
                $recentOrder = new RecentOrder($request->all());
                $result = $shop->recentOrderSetup()->save($recentOrder);
            }
        }

        return response()->json([
            'message'=>$errors ? $errors : trans('label.update_successfully'),
            'data' => $result,
        ], 200);
    }

    /**
     * @param  Request $request
     * @return \Illuminate\Http\Response
     */
    public function getSetting(Request $request){
        $get_shop = Shop::getShopByDomain($request->shopify_domain);

        if (!empty($get_shop)) {
            $recent_order = RecentOrder::getSettingByShopId($get_shop->id);
            if($recent_order){
                $data = $recent_order;
                $data->places_to_display = explode(',', $data->places_to_display);
            }
        }

        return response()->json([
            'message'=> trans('label.update_successfully'),
            'data' => array(
                'setting' => $data,
                'order' => Order::getDataByIdShop($get_shop->id),
            )
        ], 200);
    }

    public function addOrder(Request $request){
        $domain = request()->header('x-shopify-shop-domain');
        session(['shopify_domain' => $domain]);
        $shopify = ShopifyApp::shop();
        $shop = Shop::getShopByDomain($domain);
        $response = json_decode(file_get_contents('php://input'));
        $id_order_shopify = $response->id;
        $order = Order::getOrderById($response->id);
        
        if(empty($order)){
            $id_shop = $shop->id;
            $customer_name = $response->customer->last_name;
            $customer_address = $response->customer->default_address->city;
            $product_img = array_shift($shopify->api()->request('GET', '/admin/products/'.($response->line_items)[0]->product_id.'/images.json')->body->images)->src;
            $product_name = ($response->line_items)[0]->title;
            Order::saveOrder($id_shop, $id_order_shopify, $customer_name, $customer_address, $product_img, $product_name);
        }
    }
} 

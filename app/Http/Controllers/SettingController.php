<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Shop;
use App\ShopOwner;
use App\Order;

class SettingController extends Controller
{
    public function getSetting(Request $request){
        $shop = '';
        $order = '';
        if($request->domain){
            $shop_info = Shop::getShopByDomain($request->domain);
            if($shop_info){
                $shop = Shop::find($shop_info->id);
                $shop->stockTrackingSetup;
                $shop->recentVisitorsSetup;
                $shop->recentOrderSetup;
                $order = self::getOrderShopify($request->domain, $shop['recentOrderSetup']['order_to_display']);
            }
        }
        return response()->json([
            'message'=> $shop ?  trans('label.update_successfully') : trans('label.un_successfully'),
            'data' => array(
                'setting' => $shop,
                'order' => $order,
            )
        ], 200);
    }

    public function getOrderShopify($domain, $time){
        switch ($time) {
            case 0:
                $number = "0 day";
                break;
            case 1:
                $number = "-1 day";
                break;
            case 7:
                $number = "-7 day";
                break;
            case 60:
                $number = "-60 day";
                break;
            case 30:
                $number = "-30 day";
                break;
        }
        $time_to_display = date('Y-m-d H:i:s', strtotime($number));
        $order = Order::getOrderByDate($time_to_display);
        return $order;
    }

    public function getEmail(Request $request){
        $get_shop = Shop::getShopByDomain($request->shopify_domain);
        $get_shop_owner = $get_shop ? ShopOwner::getShopOwnerByShopId($get_shop->id_shop_owner) : null;
        $data= '';
        if (!empty($get_shop_owner)) {
            $data = $get_shop_owner->email;
        }
        return response()->json([
            'message'=> $data ?  trans('label.update_successfully') : trans('label.un_successfully'),
            'data' => $data
                ], 200);
    }

    public function sendEmail(Request $request){
        Mail::raw($request->message, function($sendemail) use ($request) {
            $sendemail->from($request->email);
            $sendemail->to(config('app.receiver_mail'))->subject
            ($request->subject);
        });
     }
}

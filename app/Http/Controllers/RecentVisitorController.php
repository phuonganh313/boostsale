<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RecentVisitor;
use App\Shop;

class RecentVisitorController extends Controller
{   
    public function validateData($request)
    {
        $errors = array();
        $validator = \Validator::make($request->all(), [
            'content' => 'required',
            'text_color' => 'required', 
            'quantity_color' => 'required', 
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
            
            if($shop && $shop->recentVisitorsSetup){
                $result = $shop->recentVisitorsSetup->update($request->all());

            }else{
                $recentVisitor = new RecentVisitor($request->all());
                $result = $shop->recentVisitorsSetup()->save($recentVisitor);
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
            $data = RecentVisitor::getSettingByShopId($get_shop->id);
        }

        return response()->json([
            'message'=> $data ? trans('label.update_successfully') : trans('label.un_successfully'),
            'data' => $data
        ], 200);
    }
}
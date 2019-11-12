<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Shop;
use App\StockTracking;

class StockTrackingController extends Controller
{
    public function validateData($request)
    {
        $errors = array();
        $validator = \Validator::make($request->all(), [
            'content' => 'required', 
            'text_color' => 'required', 
            'quantity_color' => 'required', 
            'background_color' => 'required', 
            'stock_quantity' => 'required|integer', 
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

            if($shop && $shop->stockTrackingSetup){         
                $result = $shop->stockTrackingSetup->update($request->all());
            }else{
                $stockTracking = new StockTracking($request->all());
                $result = $shop->stockTrackingSetup()->save($stockTracking);
            }
        }
        
        return response()->json([
            'message'=>$errors ? $errors: trans('label.update_successfully'),
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
            $data = StockTracking::getSettingByShopId($get_shop->id);
        }

        return response()->json([
            'message'=> $data ?  trans('label.update_successfully') : trans('label.un_successfully'),
            'data' => $data
        ], 200);
    }
}
<?php

namespace App;
use DB;
class StockTracking extends General
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'stock_tracking_setup';
    protected $fillable = [
        'id', 'id_shop', 'stock_quantity','content','background_color','text_color','quantity_color','active','created_at','updated_at'
    ];

    /**
     * @param string $shop_id
     * @return array
     * <pre>
     * array (
     *  'id' => int,
     *  'id_shop' => int,
     *  'stock_quantity' => int,
     *  'content' => text,
     *  'background_color' => varchar,
     *  'text_color' => varchar,
     *  'quantity_color' => varchar,
     *  'active' => tinyint,
     *  'created_at' => timestamp,
     *  'updated_at' => timestamp
     * )
     */
    public static function getSettingByShopId($shop_id){
        return DB::table('stock_tracking_setup')->where('id_shop', $shop_id)->first();
    }
}
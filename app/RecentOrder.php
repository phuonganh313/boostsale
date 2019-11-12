<?php

namespace App;
use DB;
class RecentOrder extends General
{
      /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'recent_order_setup';
    protected $fillable = [
        'id', 'id_shop', 'background', 'product_name_color', 'customer_name_color', 'purchasing_time', 'text_color',
        'text_font', 'product_name_font', 'customer_name_font', 'text_style', 'product_name_style', 'customer_name_style',
        'content','time_to_display','repeat', 'places_to_display', 'order_to_display', 'active','pc_position','mb_position','created_at','updated_at'
    ];
    
    /**
     * @param string $shop_id
     * @return array
     * <pre>
     * array (
     *  'id' => int,
     *  'id_shop' => int,
     *  'background' => varchar,
     *  'product_name_color' => varchar,
     *  'customer_name_color' => varchar,
     *  'purchasing_time' => varchar,
     *  'text_color' => varchar,
     *  'text_font' => enum,
     *  'product_name_font' => enum,
     *  'customer_name_font' => enum,
     *  'text_style' => enum,
     *  'product_name_style' => enum,
     *  'customer_name_style' => enum,
     *  'content' => text,
     *  'time_to_display' => int,
     *  'repeat' => int,
     *  'places_to_display' => varchar,
     *  'order_to_display' => text,
     *  'active' => tinyint,
     *  'created_at' => timestamp,
     *  'updated_at' => timestamp
     * )
     */
    public static function getSettingByShopId($shop_id){
        return DB::table('recent_order_setup')->where('id_shop', $shop_id)->first();
    }
}
<?php

namespace App;
use DB;

class RecentVisitor extends General
{   
      /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'recent_visitors_setup';
    protected $fillable = [
        'id', 'id_shop', 'text_color', 'quantity_color','font','style','content','time_to_display','repeat','active','created_at','updated_at'
    ];

    /**
     * @param string $shopId
     * @return array
     * <pre>
     * array (
     *  'id' => int,
     *  'id_shop' => int,
     *  'text_color' => varchar,
     *  'quantity_color' => varchar,
     *  'font' => enum,
     *  'style' => enum,
     *  'content' => text,
     *  'time_to_display' => int,
     *  'repeat' => int,
     *  'active' => tinyint,
     *  'created_at' => timestamp,
     *  'updated_at' => timestamp
     * )
     */
    public static function getSettingByShopId($shop_id){
        return DB::table('recent_visitors_setup')->where('id_shop', $shop_id)->first();
    }
}
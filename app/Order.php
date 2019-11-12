<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
      /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'order';
    protected $fillable = [
        'id', 'id_order', 'id_shop', 'customer_name', 'customer_address', 'product_img', 'product_name','customer_last_name','customer_county','created_at','updated_at'];
    
    /**
     * @param int $shop_id
     * @return array
     * <pre>
     * array (
     *  'id' => int,
     *  'id_shop' => int,
     *  'customer_name' => string,
     *  'customer_address' => string,
     *  'product_img' => string,
     *  'product_name' => tinyint,
     *  'created_at' => timestamp,
     *  'updated_at' => timestamp
     * )
     */
    public static function getDataByIdShop($shop_id){
        return DB::table('order')->where('id_shop', $shop_id)->first();
    }


    /**
     * @param int $shop_id
     * @param string $domain
     * @return array
     * <pre>
     * array (
     *  'id' => int,
     *  'id_shop' => int,
     *  'customer_name' => string,
     *  'customer_address' => string,
     *  'product_img' => string,
     *  'product_name' => tinyint,
     *  'created_at' => timestamp,
     *  'updated_at' => timestamp
     * )
     */
    public static function saveOrder($id_shop, $id_order_shopify, $customer_name, $customer_address, $product_img, $product_name,  $customer_last_name, $customer_country){
        $order = new Order();
        $order->id_order_shopify = $id_order_shopify;
        $order->id_shop = $id_shop;
        $order->customer_name = $customer_name;
        $order->customer_address = $customer_address;
        $order->product_img = $product_img;
        $order->product_name = $product_name;
        $order->customer_last_name = $customer_last_name;
        $order->customer_country = $customer_country;
        $order->save();
    }

    public static function getOrderByDate($date){
        return DB::table('order')->where('created_at', '>=', $date)->get();
    }

    public static function getOrderById($id_order_shopify){
        return DB::table('order')->where('id_order_shopify', $id_order_shopify)->first();
    }
}
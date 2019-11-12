<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'shops';
    protected $fillable=['id','shopify_domain','shopify_token','id_shop_owner','created_at','updated_at','charge_id','grandfathered','namespace','plan_id','freemium'];
    
    /**
     * Relationship: shopOwner
     * @return Object ShopOwner
     */
    public function shopOwner() {
        return $this->belongsTo('App\ShopOwner','id','id_shop_owner');
    }

    /**
     * Relationship: stock_tracking_setup
     * @return Object stock_tracking_setup
     */
    public function stockTrackingSetup() {
        return $this->hasOne('App\StockTracking','id_shop');
    }   

    /**
     * Relationship: recent_visitors_setup
     * @return Object recent_visitors_setup
     */
    public function recentVisitorsSetup() {
        return $this->hasOne('App\RecentVisitor','id_shop');
    }

    /**
     * Relationship: recent_order_setup
     * @return Object recent_order_setup
     */
    public function recentOrderSetup() {
        return $this->hasOne('App\RecentOrder','id_shop');
    }
 
    /**
     * @param string $domain
     * @return array
     * <pre>
     * array (
     *  'id' => int,
     *  'shopify_domain' => varchar,
     *  'shopify_token' => string,
     *  'id_shop_owner' => int,
     *  'active' => tinyint,
     *  'charge_id' => bigint,
     *  'grandfathered' => tinyint,
     *  'created_at' => timestamp,
     *  'updated_at' => timestamp
     * )
     */
    public static function getShopByDomain($domain) {
        $query = DB::table('shops')
                    ->where('shopify_domain', $domain);
        return $query->first();
    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class General extends Model
{
    /**
     * Relationship: shops
     * @return Object Shop
     */
    public function shop(){
        return $this->hasOne(Shop::class);
    }
}
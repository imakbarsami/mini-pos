<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    
    protected $fillable = [
        'name',
        'sku',
        'price',
        'stock_quantity',
        'image'
    ];
        

    public function orderItems():HasMany{
        
        return $this->hasMany(OrderItem::class);
    }   
}

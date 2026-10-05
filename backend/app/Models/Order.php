<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    
    protected $fillable = [
        'customer_id',
        'order_number',
        'sub_total',
        'discount',
        'tax_amount',
        'grand_total',
        'status'
    ];

    public function customer():BelongsTo{
        
        return $this->belongsTo(Customer::class);
    }


    public function orderItems():HasMany{
        
        return $this->hasMany(OrderItem::class);
    }

    public function journalEntry():HasOne{

        return $this->hasOne(JournalEntry::class);
    }
}

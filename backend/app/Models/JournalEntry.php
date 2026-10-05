<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
    
class JournalEntry extends Model
{


    protected $fillable = [
        'order_id',
        'date',
    ];

    public function order():BelongsTo{

        return $this->belongsTo(Order::class);
    }

    public function lines():HasMany{

        return $this->hasMany(JournalEntryLine::class);
    }

}

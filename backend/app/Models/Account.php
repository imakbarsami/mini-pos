<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    protected $fillable = [
        'name',
        'type',
    ];

    public function journalEntryLines():HasMany{
        
        return $this->hasMany(JournalEntryLine::class);
    }
}

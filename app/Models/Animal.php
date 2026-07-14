<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    protected $fillable = [
        'type',
        'number',
        'active',
    ];

    public function shohibulQurbans()
    {
        return $this->hasMany(ShohibulQurban::class);
    }
}

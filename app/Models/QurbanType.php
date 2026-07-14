<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QurbanType extends Model
{
    protected $fillable = [
        'name',
        'active',
    ];

    public function shohibulQurbans()
    {
        return $this->hasMany(ShohibulQurban::class);
    }
}

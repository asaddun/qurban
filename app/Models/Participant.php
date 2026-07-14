<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'address',
        'request_part',
        'dist_cow',
        'dist_goat',
        'notes',
    ];

    public function shohibulQurbans()
    {
        return $this->hasMany(ShohibulQurban::class);
    }
}

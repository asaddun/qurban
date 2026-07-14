<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShohibulQurban extends Model
{
    protected $fillable = [
        'participant_id',
        'qurban_type_id',
        'name',
    ];

    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }

    public function qurbanType()
    {
        return $this->belongsTo(QurbanType::class);
    }

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }
}

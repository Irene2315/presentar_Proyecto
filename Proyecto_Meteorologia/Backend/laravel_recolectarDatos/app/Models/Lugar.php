<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lugar extends Model
{
    use HasFactory;
    protected $table = 'lugares';
    protected $fillable = [
        'id',
        'nombre',
        'latitud',
        'longitud',
        'idProvincia'
    ];

    public function provincia(){
        return $this->belongsTo(Provincia::class);
    }
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lectura_Item_Meteo extends Model
{
    use HasFactory;
    protected $table = 'lectura_items_meteo';
    protected $fillable = [
        'idLugar',
        'hora/fecha',
        'valorTemp',
        'valorHumedad',
        'valorViento',
        'prevision'

    ];

    public function lugar(){
        return $this->belongsTo(Lugar::class);  
    }
}

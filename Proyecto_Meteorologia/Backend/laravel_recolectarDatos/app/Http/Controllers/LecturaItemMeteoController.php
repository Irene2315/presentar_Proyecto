<?php

namespace App\Http\Controllers;

use App\Models\Lectura_Item_Meteo;
use App\Models\Lugar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class LecturaItemMeteoController extends Controller
{
    

    public function migrarDatosMeteo()
    {
        $lugares = Lugar::all();
        
        foreach ($lugares as $lugar) {
            // Realizar la solicitud GET
            
            $response = Http::get('https://api.openweathermap.org/data/2.5/weather?lat='.$lugar->latitud.'&lon='.$lugar->longitud.'&appid=6d436ee157588ac7925207ca597a01a9');
    
            if ($response->successful()) {
                $data = $response->json();
    
                $windData = $data['wind'];
                $mainData = $data['main'];
                $weatherData = $data['weather'][0];
                $temperaturaCelsius = $mainData['temp'] - 273.15;
                $fechaHoraActual = Carbon::now('Europe/Madrid') ; 
                $codigoClima = $weatherData['id'];
                $descripcionClima = '';
    
                if ($codigoClima >= 200 && $codigoClima < 600) {
                    $descripcionClima = 'Lluvia';
                } elseif ($codigoClima >= 600 && $codigoClima < 623) {
                    $descripcionClima = 'Nieve';
                } elseif ($codigoClima == 800) {
                    $descripcionClima = 'Sol';
                } elseif ($codigoClima >= 801 && $codigoClima < 805) {
                    $descripcionClima = 'Nublado';
                } else {
                    $descripcionClima = 'Descripción predeterminada';
                }
    
                // Almacenar los datos en la base de datos
                Lectura_Item_Meteo::create([
                    'idLugar' => $lugar->id,  // Assuming there's an 'id' property in your Lugar model
                    'fecha_hora' => $fechaHoraActual,
                    'valorTemp' => $temperaturaCelsius,
                    'valorHumedad' => $mainData['humidity'],
                    'valorViento' => $windData['speed'],
                    'prevision' => $descripcionClima,
                ]);
            } else {
                return response()->json(['error' => 'No se pudo obtener la información de la API meteorológica (Irun)'], 500);
            }
        }
    
        return response()->json(['message' => 'Datos meteorológicos Irun migrados exitosamente']);
    }
    
    

    

    


    
    

    

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Lectura_Item_Meteo $lectura_Item_Meteo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lectura_Item_Meteo $lectura_Item_Meteo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lectura_Item_Meteo $lectura_Item_Meteo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lectura_Item_Meteo $lectura_Item_Meteo)
    {
        //
    }
}

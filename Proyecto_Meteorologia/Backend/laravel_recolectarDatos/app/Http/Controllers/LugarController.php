<?php

namespace App\Http\Controllers;

use App\Models\Lugar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LugarController extends Controller
{
    public function migrarDatosBizkaia()
    {
        // Realizar la solicitud GET
        $response = Http::get('https://www.el-tiempo.net/api/json/v2/provincias/48/municipios');

        if ($response->successful()) {
            // Obtener el contenido de la respuesta en formato JSON
            $data = $response->json();

            $filteredData = collect($data['municipios'])
                ->whereIn('CODIGOINE', ['48020000000', '48017000000'])
                ->map(function ($lugarData) {
                    $lugarData['CODIGOINE'] = substr($lugarData['CODIGOINE'], 0, 5);
                    return $lugarData;
                })
                ->all();

            foreach ($filteredData as $lugarData) {
                Lugar::create([
                    'id' => $lugarData['CODIGOINE'],
                    'nombre' => $lugarData['NOMBRE'],
                    'latitud' => $lugarData['LATITUD_ETRS89_REGCAN95'],
                    'longitud' => $lugarData['LONGITUD_ETRS89_REGCAN95'],
                    'idProvincia' => $lugarData['CODPROV']
                ]);
            }

            return response()->json(['message' => 'Lugares de Bizkaia migrados EXITOSAMENTE']);
        } else {

            return response()->json(['error' => 'No se pudo obtener la información de la API(Lugares Bizkaia)'], 500);
        }
    }

    public function migrarDatosGuipuzkoa()
    {
        $response = Http::get('https://www.el-tiempo.net/api/json/v2/provincias/20/municipios');

        if ($response->successful()) {

            $data = $response->json();

            $filteredData = collect($data['municipios'])
                ->whereIn('CODIGOINE', ['20030000000', '20029000000', '20018000000', '20071000000', '20069000000', '20045000000'])
                ->map(function ($lugarData) {
                    $lugarData['CODIGOINE'] = substr($lugarData['CODIGOINE'], 0, 5);
                    return $lugarData;
                })
                ->all();
            foreach ($filteredData as $lugarData) {
                Lugar::create([
                    'id' => $lugarData['CODIGOINE'],
                    'nombre' => $lugarData['NOMBRE'],
                    'latitud' => $lugarData['LATITUD_ETRS89_REGCAN95'],
                    'longitud' => $lugarData['LONGITUD_ETRS89_REGCAN95'],
                    'idProvincia' => $lugarData['CODPROV']
                ]);
            }

            return response()->json(['message' => 'Lugares de Guipuzkoa migrados EXITOSAMENTE']);
        } else {

            return response()->json(['error' => 'No se pudo obtener la información de la API(Lugares Guipuzkoa)'], 500);
        }
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
    public function show(Lugar $lugar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Lugar $lugar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Lugar $lugar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lugar $lugar)
    {
        //
    }
}

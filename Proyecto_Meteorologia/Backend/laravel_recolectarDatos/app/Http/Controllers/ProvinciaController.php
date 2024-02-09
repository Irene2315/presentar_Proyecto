<?php

namespace App\Http\Controllers;

use App\Models\Provincia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProvinciaController extends Controller
{
   
    public function migrarDatosProvincia()
    {
        
        $response = Http::get('https://www.el-tiempo.net/api/json/v2/provincias');

        if ($response->successful()) {
            
            $data = $response->json();

            $filteredData = collect($data['provincias'])->where('CODAUTON', '16')->all();

            
            foreach ($filteredData as $provinciaData) {
                Provincia::create([
                    'id' => $provinciaData['CODPROV'], 
                    'nombre' => $provinciaData['NOMBRE_PROVINCIA']   
                ]);
            }

            return response()->json(['message' => 'Provincias migradas EXITOSAMENTE']);
        } else {
            return response()->json(['error' => 'No se pudo obtener la información de la API (Provicias Euskadi)'], 500);
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
    public function show(Provincia $provincia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Provincia $provincia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Provincia $provincia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Provincia $provincia)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Lugar;
use Carbon\Traits\ToStringFormat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class LugarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function todosLosLugares()
    {
        $lugares = Lugar::all();

        $response = [];

        foreach ($lugares as $lugar) {
            $response[] = [
                'id' => $lugar->id,
                'nombre' => $lugar->nombre,
                'latitud' => $lugar->latitud,
                'longitud' => $lugar->longitud,
                'idProvincia' => $lugar->idProvincia,
            ];
        }

        return response()->json($response);
    }

    public function lugarConcreto($lugares)
    {
        $lugaresSelect = [];
    
        $arrayDeIdsLugares = json_decode($lugares);
    
        
        foreach ($arrayDeIdsLugares as $cod_ciudad) {
            $lugar = Lugar::where('id', $cod_ciudad)->get();

            if ($lugar) {
                array_push($lugaresSelect, $lugar[0]);
            }    
            
        }
        return response()->json($lugaresSelect);
    }

    
    

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

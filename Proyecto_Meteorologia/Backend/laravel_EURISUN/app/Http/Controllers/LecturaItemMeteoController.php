<?php

namespace App\Http\Controllers;

use App\Models\Lectura_Item_Meteo;

use Illuminate\Http\Request;


class LecturaItemMeteoController extends Controller
{

    public function itemsLugares($lugares)
    {
        $itemsLugares = [];

        $arrayDeIdLugares = json_decode($lugares);

        foreach ($arrayDeIdLugares as $cod_ciudad) {
            $itemsLugar = Lectura_Item_Meteo::where('idLugar', $cod_ciudad)->get();

            if ($itemsLugar) {
                array_push($itemsLugares, $itemsLugar);
            }

        }


        return response()->json($itemsLugares);
    }

    public function itemsLugarAhora($lugares)
    {
        $itemsLugaresAhora = [];

        $arrayDeIdLugares = json_decode($lugares);

        foreach ($arrayDeIdLugares as $cod_ciudad) {
            $itemsLugarAhora = Lectura_Item_Meteo::where('idLugar', $cod_ciudad)
                ->latest('fecha_hora')
                ->first();

            if ($itemsLugarAhora) {
                array_push($itemsLugaresAhora, $itemsLugarAhora);
            }

        }


        return response()->json($itemsLugaresAhora);
    }

    public function itemsLugar($lugar, $fechaInicio, $fechaFin)
    {

        $idLugar = json_decode($lugar);

        
        $itemsLugar = Lectura_Item_Meteo::where('idLugar', $idLugar)
            ->whereBetween('fecha_hora', [$fechaInicio, $fechaFin])
            ->groupBy(Lectura_Item_Meteo::raw('DATE(fecha_hora)'))
            ->select([
                Lectura_Item_Meteo::raw('DATE(fecha_hora) as fecha'),
                Lectura_Item_Meteo::raw('AVG(valorTemp) as mediaTemp'),
                Lectura_Item_Meteo::raw('AVG(valorHumedad) as mediaHumedad')
            ])
            ->orderBy('fecha', 'ASC') 
            ->get();





        return response()->json($itemsLugar);
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

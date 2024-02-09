<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LecturaItemMeteoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\LugarController;
use App\Models\Lectura_Item_Meteo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('registro',[AuthController::class,'register']);

Route::post('logueo',[AuthController::class,'login']);

Route::get('conseguirLugares',[LugarController::class,'todosLosLugares']);

Route::get('lugaresSeleccionados/{lugares}', [LugarController::class, 'lugarConcreto']);



Route::get('itemsLugar/{lugar}/{fechaInicio}/{fechaFin}', [LecturaItemMeteoController::class, 'itemsLugar']);

Route::get('itemsLugarAhora/{lugares}', [LecturaItemMeteoController::class, 'itemsLugarAhora']);

//Rutas que se pueda acceder a ellas cuando estemos en la sesión
Route::middleware(['auth:api'])->group(function(){
    
    

    Route::get('cerrarSesion',[AuthController::class,'logout']);
});
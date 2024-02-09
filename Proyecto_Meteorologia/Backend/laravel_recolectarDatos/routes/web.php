<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\LugarController;
use App\Http\Controllers\LecturaItemMeteoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Route::get('/api/migrar-provincias', [ProvinciaController::class, 'migrarDatosProvincia']);

//Route::get('/api/migrar-lugares-Bizkaia', [LugarController::class, 'migrarDatosBizkaia']);

//Route::get('/api/migrar-lugares-Guipuzkoa', [LugarController::class, 'migrarDatosGuipuzkoa']);

//Route::get('/api/migrar-datos-meteorologicos-irun', [LecturaItemMeteoController::class, 'migrarDatosMeteoIrun']);

//Route::get('/api/migrar-datos-meteorologicos-tolosa', [LecturaItemMeteoController::class, 'migrarDatosMeteoTolosa']);

//Route::get('/api/migrar-datos-meteorologicos-deba', [LecturaItemMeteoController::class, 'migrarDatosMeteoDeba']);

//Route::get('/api/migrar-datos-meteorologicos-azpeitia', [LecturaItemMeteoController::class, 'migrarDatosMeteoAzpeitia']);

//Route::get('/api/migrar-datos-meteorologicos-bermeo', [LecturaItemMeteoController::class, 'migrarDatosMeteoBermeo']);

//Route::get('/api/migrar-datos-meteorologicos-donosti', [LecturaItemMeteoController::class, 'migrarDatosMeteoDonosti']);

//Route::get('/api/migrar-datos-meteorologicos-eibar', [LecturaItemMeteoController::class, 'migrarDatosMeteoEibar']);

//Route::get('/api/migrar-datos-meteorologicos-bilbao', [LecturaItemMeteoController::class, 'migrarDatosMeteoBilbao']);
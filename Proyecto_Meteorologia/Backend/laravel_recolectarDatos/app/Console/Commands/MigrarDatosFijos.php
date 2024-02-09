<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\ProvinciaController;
use App\Http\Controllers\LugarController;

class MigrarDatosFijos extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrar-datos-fijos';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migra las tablas que no van a cambiar';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $provinciaController = new ProvinciaController();
        $resultProvincia = $provinciaController->migrarDatosProvincia();

        $bizkaiaController = new LugarController();
        $resultBizkaia = $bizkaiaController->migrarDatosBizkaia();

        $guipuzkoaController = new LugarController();
        $resultGuipuzkoa = $guipuzkoaController->migrarDatosGuipuzkoa();

        $this->info($resultProvincia);
        $this->info($resultBizkaia);
        $this->info($resultGuipuzkoa);

    }
}

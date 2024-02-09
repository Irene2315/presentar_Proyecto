<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\LecturaItemMeteoController;

class MigrarItemsCadaXTiempo extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrar-items-cada-x-tiempo';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migramos los datos de los itemns meteorologicos de los lugares';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $meteoController = new LecturaItemMeteoController();
        $result = $meteoController->migrarDatosMeteo();

        $this->info($result);
        
    }
}

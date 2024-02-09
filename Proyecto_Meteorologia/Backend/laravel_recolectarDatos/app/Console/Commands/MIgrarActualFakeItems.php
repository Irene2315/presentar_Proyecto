<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Models\Lectura_Item_Meteo;

class MigrarActualFakeItems extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrar-actual-fake-items';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Lectura_Item_Meteo::factory()->now()->count(8)->create();
    }
}

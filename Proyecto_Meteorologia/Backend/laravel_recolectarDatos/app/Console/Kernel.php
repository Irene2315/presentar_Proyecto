<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
       $schedule->exec('php artisan app:migrar-datos-fijos');
       $schedule->exec('php artisan app:migrar-items-cada-x-tiempo')->everyFifteenMinutes();
       $schedule->exec('php artisan app:migrar-actual-fake-items')->everyMinute();
    $schedule->exec('php artisan app:migrar-historico')->everyMinute();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

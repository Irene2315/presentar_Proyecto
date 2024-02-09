<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * The name of the table that should be before this table.
     *
     * @var string|array
     */
    protected $before = 'lectura_item_meteos';

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lugares', function (Blueprint $table) {
            $table->id('id');
            $table->string('nombre');
            $table->float('latitud');
            $table->float('longitud');
            $table->unsignedBigInteger('idProvincia');
            $table->timestamps();
            
            $table->foreign('idProvincia')->references('id')->on('provincias');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lugares');
    }
};
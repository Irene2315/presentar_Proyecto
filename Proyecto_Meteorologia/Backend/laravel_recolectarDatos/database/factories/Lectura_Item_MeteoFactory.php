<?php

namespace Database\Factories;

use App\Models\Lectura_Item_Meteo;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class Lectura_Item_MeteoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Definición predeterminada para el primer tipo de respuesta
        return [
            'idLugar' => $this->faker->unique()->randomElement(['20018','48017','48020','20029','20069','20030','20045','20071']),
            'fecha_hora' => $this->faker->unique()->dateTimeBetween('-1 month', 'now', 'Europe/Madrid'),
            'valorTemp' => $this->faker->randomFloat(2, 0, 20),
            'valorHumedad' => $this->faker->randomFloat(2, 1, 10),
            'valorViento' => $this->faker->randomFloat(2,1,10),
            'prevision' => function (array $attributes) {
                $temperatura = $attributes['valorTemp'];
                if ($temperatura >= 0 && $temperatura <= 3) {
                    return 'Nieve';
                } else {
                    return $this->faker->randomElement(['Soleado', 'Nublado', 'Lluvia']);
                }
            },
        ];
    }

    /**
     * Define the "now" state for the model.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function now(): Factory
    {
        // Definición para el segundo tipo de respuesta
        return $this->state(function (array $attributes) {
            return [
                'fecha_hora' => Carbon::now('Europe/Madrid'),
            ];
        });
    }

    
}

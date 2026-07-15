<?php

namespace Database\Seeders;

use App\Models\QurbanType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QurbanTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        QurbanType::insert([
            [
                'name' => 'Kolektif Sapi',
                'price' => 4000000,
                'active' => true,
            ],
            [
                'name' => 'Titip Sapi',
                'price' => 1000000,
                'active' => true,
            ],
            [
                'name' => 'Titip Kambing',
                'price' => 500000,
                'active' => true,
            ],
        ]);
    }
}

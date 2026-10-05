<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products=[
            [
                'name' => 'Logitech Wireless Mouse',
                'sku' => 'PRD-MOU-001',
                'price' => 850.00,
                'stock_quantity' => 50,
                'image' => 'https://dummyimage.com/300x300/eeeeee/333333.png&text=Mouse'
            ],
            [
                'name' => 'Mechanical Keyboard',
                'sku' => 'PRD-KEY-002',
                'price' => 2500.00,
                'stock_quantity' => 30,
                'image' => 'https://dummyimage.com/300x300/eeeeee/333334.png&text=Keyboard'
            ],
            [
                'name' => 'Dell 22-inch Monitor',
                'sku' => 'PRD-MON-003',
                'price' => 12500.00,
                'stock_quantity' => 10,
                'image' => 'https://dummyimage.com/300x300/eeeeee/333335.png&text=Monitor'
            ],
            [
                'name' => 'HP 16GB Pendrive',
                'sku' => 'PRD-PEN-004',
                'price' => 550.00,
                'stock_quantity' => 100,
                'image' => 'https://dummyimage.com/300x300/eeeeee/333336.png&text=Pendrive'
            ],
        ];

        foreach($products as $product){

            // avoid duplicate data
            Product::firstOrCreate([
                'sku' => $product['sku']
            ], $product);
        }
    }
}

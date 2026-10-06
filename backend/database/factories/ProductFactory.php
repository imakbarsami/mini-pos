<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $brands = [
            'HP',
            'Dell',
            'Samsung',
            'Logitech',
            'A4Tech',
            'TP-Link',
            'JBL',
            'Anker',
            'Xiaomi',
            'Kingston',
            'Lenovo',
            'ASUS',
            'Sony',
            'UGREEN',
            'Corsair',
        ];

    $products = [
            'Wireless Mouse',
            'Keyboard',
            'Gaming Mouse',
            'USB Cable',
            'Type-C Cable',
            'Pendrive',
            'Power Bank',
            'Bluetooth Speaker',
            'Webcam',
            'WiFi Router',
            'SSD',
            'RAM',
            'Headphone',
            'USB Hub',
            'Laptop Stand',
        ];

    $name = fake()->randomElement($brands)
            . ' '
            . fake()->randomElement($products);

        return [
            'name' => $name,
            'sku' => 'PRD-' . fake()->unique()->bothify('???-####'),
            'price' => fake()->randomFloat(2, 100, 50000),
            'stock_quantity' => fake()->numberBetween(0, 500),
            'image' => 'https://dummyimage.com/300x300/eeeeee/333336.png?text='. urlencode($name),
        ];
    }
}

<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers=[
            [
                'name' => 'Rohim Uddin',
                'phone' => '01711000001',
                'email' => 'rahim@example.com',
                'address' => 'Uttara, Dhaka'
            ],
            [
                'name' => 'Karim Saheb',
                'phone' => '01811000002',
                'email' => 'karim@example.com',
                'address' => 'Mirpur, Dhaka'
            ],
            [
                'name' => 'Akbar Sami',
                'phone' => '01911000003',
                'email' => 'sami@example.com',
                'address' => 'Chittagong, Bangladesh'
            ],
        ];

        foreach($customers as $customer){

            // avoid duplicate data
            Customer::firstOrCreate([
                'phone' => $customer['phone']
            ], $customer);
        }
    }
}

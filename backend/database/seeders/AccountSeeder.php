<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $accounts = [
            [
                'name' => 'Accounts Receivable', 
                'type' => 'Asset'
            ],
            [
                'name' => 'Sales Revenue', 
                'type' => 'Revenue'
            ],
            [
                'name' => 'Tax Payable', 
                'type' => 'Liability'
            ],
        ];

        foreach($accounts as $account){

            // avoid duplicate data
            Account::firstOrCreate([
                'name' => $account['name']
            ], $account);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(){

        $customers=Customer::select('id','name','phone')
                    ->orderBy('name','asc')
                    ->get();

        return response()->json([
            'status'=>200,
            'customers'=>$customers
        ],200);
    }
}

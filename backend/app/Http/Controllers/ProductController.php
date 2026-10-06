<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){

        $products=Product::select('id','name','price','stock_quantity')
                    ->orderBy('name','asc')
                    ->get();

        return response()->json([
            'status'=>200,
            'products'=>$products
        ],200);
    }
}

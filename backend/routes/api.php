<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// login 
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/customers', [CustomerController::class, 'index']);
    Route::get('/products', [ProductController::class, 'index']);

    Route::post('/orders', [OrderController::class, 'store']);
});
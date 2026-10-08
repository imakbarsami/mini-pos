<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
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

    Route::get('/customers-dropdown', [CustomerController::class, 'customersDropdown']);
    Route::get('/products-dropdown', [ProductController::class, 'productsForDropdown']);

    // order routes
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{id}/complete', [OrderController::class, 'completeOrder']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    // products route
    Route::get('/products', [ProductController::class, 'index']);
    Route::post('/products', [ProductController::class, 'store']); 
    Route::post('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']); 

    Route::get('/customers', [CustomerController::class, 'index']);
    Route::post('/customers', [CustomerController::class, 'store']);
    Route::put('/customers/{id}', [CustomerController::class, 'update']); 
    Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

    Route::post('/logout',[AuthController::class,'logout']);
});
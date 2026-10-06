<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use DB;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request){

        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1'
        ]);

        try {
        
            DB::beginTransaction();

            $subTotal = 0;
            $orderItemsData = [];

            foreach ($request->items as $item) {

                $product = Product::find($item['product_id']);
                
                $quantity = $item['quantity'];
                $unitPrice = $product->price; // db price
                $lineTotal = $quantity * $unitPrice;

                $subTotal += $lineTotal;
               
                $orderItemsData[] = [
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'line_total' => $lineTotal,
                ];
            }

            // 5% tax
            $taxAmount = $subTotal * 0.05; 
            $grandTotal = $subTotal + $taxAmount;

            // order create
            $order = Order::create([
                'customer_id' => $request->customer_id,
                'order_number' => 'ORD-' . date('Ymd') . '-' . rand(1000, 9999), 
                'sub_total' => $subTotal,
                'discount' => 0,
                'tax_amount' => $taxAmount,
                'grand_total' => $grandTotal,
                'status' => 'Pending' 
            ]);

            // order item save
            foreach ($orderItemsData as $itemData) {
                $order->orderItems()->create($itemData);
            }

            DB::commit();

            return response()->json([
                'status' => 201,
                'message' => 'Pending order created successfully.',
                'order_id' => $order->id
            ],201);

        } catch (\Exception $e) {

            DB::rollBack(); 
            return response()->json([
                'status' => 500,
                'message' => 'Order place faild',
                'error' => $e->getMessage()
            ], 500);
        }

    }
}

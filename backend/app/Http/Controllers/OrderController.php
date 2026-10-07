<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Order;
use App\Models\Product;
use DB;
use Illuminate\Http\Request;

class OrderController extends Controller
{
   public function index(Request $request)
    {

        $query = Order::with('customer:id,name,phone');

        //serach 
        if ($request->has('search') && !empty($request->search)) {

            $search = $request->search;
            $query->where('order_number', 'like', "%{$search}%")
                  ->orWhereHas('customer', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
        }

        // date filter
        if ($request->has('date') && !empty($request->date)) {
            $query->whereDate('created_at', $request->date);
        }

        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        $limit = $request->has('limit') ? (int) $request->limit : 9;
        
        $orders = $query->orderBy('id', 'desc')
                        ->paginate($limit);

        return response()->json([
            'status' => 200,
            'data' => $orders 
        ]);
    }


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


    public function completeOrder($id)
    {

        $order = Order::with('orderItems.product')->find($id);

        if (!$order) {

            return response()->json([
                'status' => 404, 
                'message' => 'Order not found'
            ],404);
        }

        if ($order->status === 'Completed') {

            return response()->json([
                'status' => 400, 
                'message' => 'Order already completed'
            ],400);
        }

        try {
            DB::beginTransaction();

            // stock check & stock quantity deduction
            foreach ($order->orderItems as $item) {

                $product = $item->product;
                
                if ($product->stock_quantity < $item->quantity) {

                    throw new \Exception("Sorry, '{$product->name}' stock is not available. Available: {$product->stock_quantity} , Ordered: {$item->quantity}");
                }

                
                $product->stock_quantity -= $item->quantity;
                $product->save();
            }

            // order status update
            $order->status = 'Completed';
            $order->save();


            $arAccount = Account::where('name', 'Accounts Receivable')->firstOrFail();
            $revenueAccount = Account::where('name', 'Sales Revenue')->firstOrFail();
            $taxAccount = Account::where('name', 'Tax Payable')->firstOrFail();

            // journal entry
            $journalEntry = $order->journalEntry()->create([
                'date' => now()->toDateString(),
            ]);

            
            $journalEntry->lines()->create([
                'account_id' => $arAccount->id,
                'type' => 'Debit',
                'amount' => $order->grand_total,
            ]);

            
            $journalEntry->lines()->create([
                'account_id' => $revenueAccount->id,
                'type' => 'Credit',
                'amount' => $order->sub_total,
            ]);

            
            $journalEntry->lines()->create([
                'account_id' => $taxAccount->id,
                'type' => 'Credit',
                'amount' => $order->tax_amount,
            ]);

            
            DB::commit();

            return response()->json([
                'status' => 200,
                'message' => 'Order completed successfully'
            ],200);

        } catch (\Exception $e) {
          
            DB::rollBack(); 
            return response()->json([
                'status' => 400, 
                'message' => $e->getMessage()
            ], 400);
        }
    }


    public function show($id)
    {
        
        $order = Order::with([
                'customer:id,name,phone,address',
                'orderItems:id,order_id,product_id,quantity,unit_price,line_total',
                'orderItems.product:id,name',
                'journalEntry.lines.account:id,name'
            ])->find($id);

        if (!$order) {
            return response()->json([
                'status' => 404,
                'message' => 'Order not found'
            ], 404);
        }

        
        $invoiceData = [
            'order_info' => [
                'order_number' => $order->order_number,
                'order_date' => $order->created_at, 
                'order_complete_date' => $order->updated_at, 
                'status' => $order->status,
                'sub_total' => $order->sub_total,
                'tax_amount' => $order->tax_amount,
                'grand_total' => $order->grand_total,
            ],
            'customer_info' => [
                'name' => $order->customer->name,
                'phone' => $order->customer->phone,
                'address' => $order->customer->address,
            ],
            
            'items' => $order->orderItems->map(function ($item) {
                return [
                    'product_name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'line_total' => $item->line_total,
                ];
            }),
            
            'accounting_breakdown' => $order->journalEntry ? $order->journalEntry->lines->map(function ($line) {
                return [
                    'account_name' => $line->account->name,
                    'type' => $line->type, 
                    'amount' => $line->amount,
                ];
            }) : null,
        ];

        
        return response()->json([
            'status' => 200,
            'data' => $invoiceData
        ],200);
    }
}

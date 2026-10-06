<?php

namespace App\Http\Controllers;

use App\Models\JournalEntryLine;
use App\Models\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
       
        $accountsReceivable = JournalEntryLine::whereHas('account', function($query) {
                                    $query->where('name', 'Accounts Receivable');
                                })->where('type', 'Debit')->sum('amount');

        
        $salesRevenue = JournalEntryLine::whereHas('account', function($query) {
                                $query->where('name', 'Sales Revenue');
                            })->where('type', 'Credit')->sum('amount');

        
        $taxPayable = JournalEntryLine::whereHas('account', function($query) {
                            $query->where('name', 'Tax Payable');
                        })->where('type', 'Credit')->sum('amount');


        
        $totalOrders = Order::count();
        $completedOrders = Order::where('status', 'Completed')->count();
        $pendingOrders = Order::where('status', 'Pending')->count();

        
        return response()->json([
            'status' => 200,
            'data' => [
                'accounting_summary' => [
                    'accounts_receivable' => $accountsReceivable,
                    'sales_revenue'       => $salesRevenue,
                    'tax_payable'         => $taxPayable,
                ],
                'orders_summary' => [
                    'total_orders'     => $totalOrders,
                    'completed_orders' => $completedOrders,
                    'pending_orders'   => $pendingOrders,
                ]
            ]
        ],200);
    }
}

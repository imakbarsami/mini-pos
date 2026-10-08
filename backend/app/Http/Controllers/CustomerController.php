<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class CustomerController extends Controller
{

    public function index(Request $request)
    {
        try {

            $query = Customer::query();

            if ($request->filled('search')) {

                $search = $request->search;
                
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                      ->orWhere('phone', 'like', '%' . $search . '%')
                      ->orWhere('email', 'like', '%' . $search . '%')
                      ->orWhere('address', 'like', '%' . $search . '%');
                });
            }

            $perPage = $request->input('per_page', 7);
            
            $customers = $query->latest()->paginate($perPage)
;

            return response()->json([
                'status' => 200,
                'data' => $customers
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to fetch customers.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function customersDropdown(){

        $customers=Customer::select('id','name','phone')
                    ->orderBy('name','asc')
                    ->get();

        return response()->json([
            'status'=>200,
            'customers'=>$customers
        ],200);
    }

    public function store(Request $request)
    {
    
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:customers,phone|max:20',
            'email' => 'nullable|email|unique:customers,email|max:100',
            'address' => 'nullable|string|max:500',
        ]);

        try {
           
            $customer = Customer::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
            ]);

            return response()->json([
                'status' => 201,
                'message' => 'Customer added successfully!',
                'data' => $customer
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to add customer.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function update(Request $request, $id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json([
                'status' => 404,
                'message' => 'Customer not found!'
            ], 404);
        }

        
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20|unique:customers,phone,' . $id,
            'email' => 'nullable|email|max:100|unique:customers,email,' . $id,
            'address' => 'nullable|string|max:500',
        ]);

        try {
            
            $customer->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
            ]);

            $customer->makeHidden(['created_at','updated_at']);

            return response()->json([
                'status' => 201,
                'message' => 'Customer updated successfully!',
                'data' => $customer
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to update customer.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    
    public function destroy($id)
    {
        $customer = Customer::find($id);

        if (!$customer) {
            return response()->json([
                'status' => 404,
                'message' => 'Customer not found!'
            ], 404);
        }

        try {

            $customer->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Customer deleted successfully!'
            ], 200);

        } catch (QueryException $e) {
            
            if ($e->getCode() == 23000) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Cannot delete this customer because they have existing orders.'
                ], 400);
            }
            
            return response()->json([
                'status' => 500,
                'message' => 'Failed to delete customer.',
                'error' => $e->getMessage()
            ], 500);
            
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to delete customer.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

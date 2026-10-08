<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
  
    public function index(Request $request)
    {
        try {

            $query = Product::query();

            if ($request->filled('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            if ($request->filled('sku')) {
                $query->where('sku', 'like', '%' . $request->sku . '%');
            }

            if ($request->filled('min_price')) {
                $query->where('price', '>=', $request->min_price);
            }
            if ($request->filled('max_price')) {
                $query->where('price', '<=', $request->max_price);
            }

            if ($request->filled('start_date')) {
                $query->whereDate('created_at', '>=', $request->start_date);
            }
            if ($request->filled('end_date')) {
                $query->whereDate('created_at', '<=', $request->end_date);
            }

            $perPage = $request->input('per_page', 10);
            
            $products = $query->latest()->paginate($perPage);

            return response()->json([
                'status' => 200,
                'data' => $products
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to fetch products.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function productsForDropdown(){

        $products=Product::select('id','name','price','stock_quantity')
                    ->orderBy('name','asc')
                    ->get();

        return response()->json([
            'status'=>200,
            'products'=>$products
        ],200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku|max:100',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        try {

            $imagePath = null;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                
                $destinationPath = public_path('uploads/products');
                
                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0755, true);
                }

                $image->move($destinationPath, $imageName);
                $imagePath = 'uploads/products/' . $imageName;
            }

            $product = Product::create([
                'name' => $request->name,
                'sku' => $request->sku,
                'price' => $request->price,
                'stock_quantity' => $request->stock_quantity,
                'image' => $imagePath,
            ]);

            return response()->json([
                'status' => 201,
                'message' => 'Product created successfully!',
                'data' => $product
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to create product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found!'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:products,sku,' . $id,
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        try {

            $imagePath = $product->image; 

            if ($request->hasFile('image')) {
                
                if ($product->image && File::exists(public_path($product->image))) {
                    File::delete(public_path($product->image));
                }

                $image = $request->file('image');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('uploads/products');
                
                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0755, true);
                }

                $image->move($destinationPath, $imageName);
                $imagePath = 'uploads/products/' . $imageName; 
            }

            $product->update([
                'name' => $request->name,
                'sku' => $request->sku,
                'price' => $request->price,
                'stock_quantity' => $request->stock_quantity,
                'image' => $imagePath,
            ]);

            return response()->json([
                'status' => 201,
                'message' => 'Product updated successfully!',
                'data' => $product
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to update product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found!'
            ], 404);
        }

        try {

            if ($product->image && File::exists(public_path($product->image))) {
                File::delete(public_path($product->image));
            }

            $product->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Product deleted successfully!'
            ], 200);

        } catch (QueryException $e) {
            
            if ($e->getCode() == 23000) {
                return response()->json([
                    'status' => 400,
                    'message' => 'This product cannot be deleted because it has already been used in an order.'
                ], 400);
            }
            
            return response()->json([
                'status' => 500,
                'message' => 'Failed to delete product.',
                'error' => $e->getMessage()
            ], 500);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Failed to delete product.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

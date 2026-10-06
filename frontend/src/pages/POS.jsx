import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomer, addToCart, removeFromCart, clearCart } from '../features/cartSlice';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiTrash2, FiShoppingCart, FiUser, FiBox, FiPlus } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const POS = () => {
  const dispatch = useDispatch();
  
  const { 
      customer_id, 
      cartItems, 
      sub_total, 
      tax_amount, 
      grand_total 
  } = useSelector((state) => state.cart);

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);


  const fetchData = async () => {
      try {

        const [customerRes, productRes] = await Promise.all([
          api.get('/customers'),
          api.get('/products')
        ]);
         
        // console.log(customerRes);
        // console.log(productRes);
        
        setCustomers(customerRes.data.customers);
        setProducts(productRes.data.products);
        
      } catch (error) {
        toast.error('Failed to load resources.');
      } finally {
        setLoadingData(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      toast.error('Please select a product.');
      return;
    }

    if (quantity < 1) {
      toast.error('Quantity must be at least 1.');
      return;
    }

    const product = products.find(p => p.id === parseInt(selectedProduct));
    
    const existingItem = cartItems.find(item => item.product_id === product.id);
    const currentCartQty = existingItem ? existingItem.quantity : 0;
    
    if (currentCartQty + parseInt(quantity) > product.stock_quantity) {
      toast.error(`Sorry! Only ${product.stock_quantity} items available in stock.`);
      return;
    }

    dispatch(addToCart({
      product_id: product.id,
      name: product.name,
      unit_price: parseFloat(product.price),
      quantity: parseInt(quantity),
      max_stock: product.stock_quantity
    }));

    setSelectedProduct('');
    setQuantity(1);
    toast.success(`${product.name} added to cart.`);
  };

  const handlePlaceOrder = async () => {

    if (!customer_id) {
      toast.error('Please select a customer.');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add at least one product.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customer_id: customer_id,
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity
        }))
      };

      const response = await api.post('/orders', payload);
      
      if (response.data.status === 201) {
        toast.success('Order placed successfully (Pending).');
        dispatch(clearCart());
      }


    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to place order.';
      toast.error(errorMsg);

    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex justify-center items-center h-full">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-600 text-4xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6">
      
      {/* Left Panel: Selection Area */}
      <div className="xl:col-span-4 space-y-6">
        
        {/* Customer Selection Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiUser className="text-blue-600" /> Select Customer
          </h3>
          <select
            value={customer_id}
            onChange={(e) => dispatch(setCustomer(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
          >
            <option value="">-- Choose a Customer --</option>
            {customers.map((cust) => (
              <option key={cust.id} value={cust.id}>{cust.name} ({cust.phone})</option>
            ))}
          </select>
        </div>

        {/* Product Add Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiBox className="text-blue-600" /> Add Product
          </h3>
          <form onSubmit={handleAddToCart} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
              >
                <option value="">-- Select Product --</option>
                {products.map((prod) => (
                  <option key={prod.id} value={prod.id} disabled={prod.stock_quantity === 0}>
                    {prod.name} (৳{prod.price}) - Stock: {prod.stock_quantity}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
              <FiPlus /> Add to Cart
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel: Cart & Billing */}
      <div className="xl:col-span-8 flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiShoppingCart className="text-blue-600" /> Cart Items
          </h3>
          
          {/* Table Area */}
          <div className="overflow-x-auto border border-gray-100 rounded-xl flex-1">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Unit Price</th>
                  <th className="px-4 py-3 text-right">Line Total</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-10 text-center text-gray-400">
                      Your cart is empty. Start adding products.
                    </td>
                  </tr>
                ) : (
                  cartItems.map((item) => (
                    <tr key={item.product_id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-center">{item.quantity}</td>
                      <td className="px-4 py-3 text-right">৳{item.unit_price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800">৳{item.line_total.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => dispatch(removeFromCart(item.product_id))}
                          className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Remove Item"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Billing Summary */}
          <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-sm text-gray-500 space-y-1">
              <p>* 5% Tax is calculated automatically.</p>
              <p>* Cannot exceed available stock quantity.</p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Sub Total:</span>
                <span className="font-semibold text-gray-800">৳{sub_total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (5%):</span>
                <span className="font-semibold text-red-500">+ ৳{tax_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg pt-3 border-t border-gray-200">
                <span className="font-bold text-gray-800">Grand Total:</span>
                <span className="font-bold text-blue-600">৳{grand_total.toFixed(2)}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full mt-4 flex justify-center items-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-2" /> Processing...</>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default POS;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customer_id: '',
    cartItems: [], 
    sub_total: 0,
    tax_amount: 0,
    grand_total: 0,
};


// real time calculation
const calculateTotals = (state) => {
    state.sub_total = state.cartItems.reduce((total, item) => total + item.line_total, 0);
    state.tax_amount = state.sub_total * 0.05; // 5% tax
    state.grand_total = state.sub_total + state.tax_amount;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setCustomer: (state, action) => {
      state.customer_id = action.payload;
    },
    
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.product_id === newItem.product_id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.line_total = existingItem.quantity * existingItem.unit_price;
      } else {
        state.cartItems.push({
            product_id: newItem.product_id,
            name: newItem.name,
            quantity: newItem.quantity,
            unit_price: newItem.unit_price,
            line_total: newItem.quantity * newItem.unit_price,
            max_stock: newItem.max_stock 
        });
      }
      
      calculateTotals(state);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.product_id !== productId);
      calculateTotals(state);
    },

    clearCart: () => {
      return initialState;
    }
  }
});

export const { setCustomer, addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
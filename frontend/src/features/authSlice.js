import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = { 
            id: action.payload.id,
            email:action.payload.email, 
            name: action.payload.name 
        };

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify({ 
            id: action.payload.id,
            email:action.payload.email, 
            name: action.payload.name 
        }));
    },
    
    logout: (state) => {
      state.token = null;
      state.user = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
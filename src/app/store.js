import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice.js';
import authReducer from '../features/auth/authSlice.js';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/ProductList/ProductListSlice.js';
import authReducer from '../features/auth/AuthSlice.js';
import cartReducer from '../features/cart/cartSlice.js'
import userReducer from '../features/user/userSlice.js';
import orderReducer from '../features/order/orderSlice.js'

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer
  },
});

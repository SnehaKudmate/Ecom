import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import CartPage from './Pages/CartPage';
import Checkout from './Pages/Checkout';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserIdByAsync } from './features/cart/cartSlice';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectedUser } from './features/auth/AuthSlice';
import NotFound from './Pages/404';
import OrderSuccessPage from './Pages/OrderSuccess';
import UserProfilePage from './Pages/UserProfilePage';
import UserOrderPage from './Pages/UserOrderPage';
import ForgotPasswordPage from './Pages/forgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './Pages/AdminHome';
import AdminProductFormPage from './Pages/AdminProductFormPage';
import AdminOrdersPage from './Pages/AdminOrdersPage';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch  = useDispatch();
  const user = useSelector(selectedUser);
 
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdByAsync());
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch,user])

  
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/forgot_password' element={<ForgotPasswordPage/>} />
        
          
          
          {/* Protected Routes */}
          <Route element={<Protected />}>          
            {/* Child routes */}
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/productDetails/:id' element={<ProductDetailsPage />} />
            <Route path='/order-success/:id' element={<OrderSuccessPage/>} />
            <Route path='/orders' element={<UserOrderPage/>} />
            <Route path='/profile' element={<UserProfilePage/>} />           
          </Route>


           {/* Protected Admin Routes */}
          <Route element={<ProtectedAdmin />}>
          {/* Child routes */}
          <Route path='admin' element={<AdminHome />} />
          <Route path='admin/add/product' element={<AdminProductFormPage />} />   
          <Route path='admin/add/product/edit/:id' element={<AdminProductFormPage />} />   
          <Route path='admin/orders' element={<AdminOrdersPage />} />          
        </Route>
          <Route path='*' element={<NotFound />} />   
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

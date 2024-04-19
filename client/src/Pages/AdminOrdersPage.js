import React from 'react';
import NavBar from "../features/Navbar/NavBar";
import AdminOrders from '../features/admin/AdminOrders';

export default function AdminOrdersPage() {
  return (
    <div>
       <NavBar>
          <AdminOrders />
       </NavBar>
    </div>
  )
}

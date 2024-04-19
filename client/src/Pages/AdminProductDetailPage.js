import React from 'react'
import Navbar from '../features/Navbar/NavBar'
import AdminProductDetails from '../features/admin/AdminProductDetail'

export default function AdminProductDetailPage() {
  return (
    <div>
      <Navbar>
        <AdminProductDetails/>
      </Navbar>
    </div>
  )
}

import React from 'react'
import Navbar from '../features/Navbar/NavBar'
import ProductList from '../features/ProductList/components/ProductList'
export default function Home() {
  return (
    <div>
      <Navbar>
       <ProductList> </ProductList>
      </Navbar>
    </div>
  )
}

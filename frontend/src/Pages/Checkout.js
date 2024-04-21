import { useState } from "react";
import {Link, Navigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {useForm} from 'react-hook-form';
import { 
 deleteItemFromCardByAsync,selectCart, updateCartAsync
} from '../features/cart/cartSlice';
import { addOrderByAsync,currentOrder } from "../features/order/orderSlice";
import { updateUserByAsync,selectUserInfo } from "../features/user/userSlice";



export default function Checkout() {
  
  const [open, setOpen] = useState(true);
  const [selectedAddress,setSelectedAddress] = useState(null);
  const [paymentMethod,setPaymentMethod] = useState('cash')
  const products = useSelector(selectCart);
  const {register,handleSubmit,formState:{errors}} = useForm();
  const dispatch = useDispatch();

  let orderPlaced = useSelector(currentOrder);
  let userInfo = useSelector(selectUserInfo);

  const totalAmount =  products.reduce((amount,item)=>item.product.price*item.quantity +amount,0);
  const totalItems =  products.reduce((total,item)=>item.quantity +total,0);

  const handleQuantity = (e,item) =>{
    dispatch(updateCartAsync({...item,quantity:e.target.value}))
  }

  const handleRemove = async(e,id)=>{
    dispatch(deleteItemFromCardByAsync(id))
  }

  const handleAddress = async(e) =>{  
  setSelectedAddress(userInfo.addresses[e.target.value]);
  }

  console.log(userInfo)

  const handleOrder = async(e) =>{
 const order = {products,userInfo,selectedAddress,paymentMethod,totalAmount,totalItems,status:"pending"};
 dispatch(addOrderByAsync(order))
  }


  const handlePayment = async(e)=>{
    console.log(e.target.value)
    setPaymentMethod(e.target.value)
  }
 
  return (
    <>
    {products.length<=0 && <Navigate to='/' replace={true}></Navigate>}
    {orderPlaced && <Navigate to={`/order-success/${orderPlaced.id}`} relative={true}></Navigate>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
     <div className='lg:col-span-3'> 
     <form className=" bg-white mt-12 p-3" noValidate onSubmit={handleSubmit((data)=>{
    
      dispatch(updateUserByAsync({...userInfo,addresses:[...userInfo.addresses,data],}))
     })}>        

       <div className="border-b border-gray-900/10 pb-12 ">
         <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
         <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

         <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
           <div className="sm:col-span-3">
             <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
               Full Name
             </label>
             <div className="mt-2">
               <input
                 type="text"
                 name="name"
                 id="name"
                 {...register('name',{required:"name is required"})}
               
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

           <div className="sm:col-span-3">
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            email
           </label>
           <div className="mt-2">
             <input
               type="text"
               name="email"
               id="email"
               {...register('email',{required:"email is required"})}
           
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
           </div>
         </div>


           <div className="sm:col-span-3">
             <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
             Mobile Number
             </label>
             <div className="mt-2">
             <input
             type="tel"
             name="phone"
             id="phone"
             {...register('phone',{required:"phone is required"})}
        
             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
           />
             </div>
           </div>

           <div className="col-span-full">
             <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
               Street address
             </label>
             <div className="mt-2">
               <input
                 type="text"
                 name="street"
                 {...register('street',{required:"street is required"})}
                 id="street"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

           <div className="sm:col-span-2 sm:col-start-1">
             <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
               City
             </label>
             <div className="mt-2">
               <input
                 type="text"
                 name="city"
                 id="city"
                 autoComplete="address-level2"
                 {...register('city',{required:"city is required"})}
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

           <div className="sm:col-span-2">
             <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
               State / Province
             </label>
             <div className="mt-2">
               <input
                 type="text"
                 name="state"
                 {...register('state',{required:"state is required"})}
                 id="state"
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

           <div className="sm:col-span-2">
             <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
               ZIP / Postal code
             </label>
             <div className="mt-2">
               <input
                 type="text"
                 name="pincode"
                 id="pincode"
                 {...register('pincode',{required:"pincode is required"})}
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>
         </div>
       </div>
       <div className="mt-6 flex items-center justify-end gap-x-6">
       <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
         reset
       </button>
       <button
         type="submit"
         className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
       >
         Add address
       </button>
     </div>

       <div className="border-b border-gray-900/10 pb-12">
         <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
         <p className="mt-1 text-sm leading-6 text-gray-600">
          Choose from existing address
         </p>
          <ul role="list" >
      {userInfo&&userInfo.addresses.map((address,index) => (
        <div className=" border-solid border-2 border-gray-200 p-3" key={address.pincode}>
        <li  className="flex justify-between gap-x-6 py-5">
        <div className="flex gap-x-4 ">
        <input
        id="cash"
        name="address"
        onChange={(e)=>handleAddress(e)}    
        value={index}
        type="radio"
        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pincode}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
          <p className="text-sm leading-6 text-gray-900">{address.city}</p>
          <p className="text-sm leading-6 text-gray-500">{address.state}</p>
        </div>
      </li>
        </div>       
      ))}
    </ul>

         <div className="mt-10 space-y-10">

           <fieldset>
             <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
             <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
             <div className="mt-6 space-y-6">
               <div className="flex items-center gap-x-3">
                 <input
                   id="cash"
                   name="payments"
                   type="radio"
                   onChange={(e)=>handlePayment(e)}
                   checked = {paymentMethod === 'cash'}
                   value="cash"
                   className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                 />
                 <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                  Cash
                 </label>
               </div>
               <div className="flex items-center gap-x-3">
                 <input
                   id="card"
                   name="payments"
                   type="radio"
                   onChange={(e)=>handlePayment(e)}
                   value="card"
                   required
                   checked = {paymentMethod === 'card'}
                   className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                 />
                 <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                  Card Payment
                 </label>
               </div>
            
             </div>
           </fieldset>
         </div>
       </div>
    
   </form>
     </div>
     <div className='lg:col-span-2'>
     <div className="mx-auto mt-12 max-w-7xl px-4 bg-white sm:px-6 lg:px-4">
    <h2 className='text-3xl'>Cart</h2>
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
    <div className="flow-root">
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {products&&products.map((item) => (
          <li key={item.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={item.product.thumbnail}
                alt={item.product.thumbnail}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <Link to={item.product.link}>{item.product.title}</Link>
                    <p className='text-gray-400'>{item.product.brand}</p>
                  </h3>
                  <p className="ml-4">{item.product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{''}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <div className="text-gray-500">
                <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900">
                Qty
                </label>
                <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity}>
                 <option value="1">1</option>
                 <option value="2">2</option>
                 <option value="3">3</option>
                 <option value="4">4</option>
                 <option value="5">5</option>
                 <option value="6">6</option>
                 <option value="7">7</option>
                </select>
                </div>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={(e)=>handleRemove(e, item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>


<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
  <div className="flex justify-between text-base mx-2 font-medium text-gray-900">
    <p>Subtotal</p>
    <p>{totalAmount}</p>
  </div>
  <div className="flex justify-between text-base mx-2 font-medium text-gray-900">
  <p>Total items in cart</p>
  <p>{totalItems} items</p>
</div>
  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
  <div className="mt-6">
    <div onClick={handleOrder}
      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
    >
      Order Now
    </div>
  </div>
  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    <p>
      or{' '}
      <button
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500"
        onClick={() => setOpen(false)}
      >
      <Link to='/'>
      Continue Shopping
      </Link>
       
        <span aria-hidden="true"> &rarr;</span>
      </button>
    </p>
  </div>
</div>
</div>
     </div>
    </div>
    </div>
    </>
  )
}
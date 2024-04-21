import React from 'react';
import { selectedUser } from '../AuthSlice';
import { Outlet,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
  const  currentUser = useSelector(selectedUser)
  console.log(currentUser);
  return (
    currentUser ? <Outlet /> : <Navigate to="/login" />
  )
}
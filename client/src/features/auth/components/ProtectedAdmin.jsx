import React from 'react';
import { selectUserInfo } from '../../user/userSlice';
import { Outlet,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedAdmin() {
  const  currentUser = useSelector(selectUserInfo)
  return (
   ( currentUser&&currentUser.role =='admin') ? <Outlet /> : <Navigate to="/" />
  )
}
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserByAsync, selectUserInfo, fetchLoggedInUserAsync } from '../userSlice';
import { selectedUser } from '../../auth/AuthSlice';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo); // Renamed from `user` to `userInfo` for consistency

  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserByAsync({ newUser }));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserByAsync(newUser));
  };


  return (
    <div>
      {userInfo && (
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Name: {userInfo.addresses.name ?userInfo.addresses.name : 'New User'}
            </h1>
            <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
              email address : {userInfo.email}
            </h3>
            <Link to="/admin">admin</Link>
            {userInfo.role === 'admin' && (
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                role : {userInfo.role}
              </h3>
            )}
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
            {userInfo.addresses.map((address, index) => (
              <div key={index}>
                {selectedEditIndex === index ? (
                  <form
                    className="bg-white px-5 py-12 mt-12"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      console.log(data);
                      handleEdit(data, index);
                      reset();
                    })}
                  >
                    {/* Form inputs here */}
                  </form>
                ) : (
                  <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                    {/* Address info here */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

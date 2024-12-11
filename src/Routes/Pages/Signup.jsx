import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import image1 from "../../images/image2.png"
import { signupTodoDatabase } from '../../Redux_Toolkit/loginSlice';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Define the validation schema using Yup
const schema = yup.object({
  name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const Signup = () => {
  const dispatch = useDispatch()
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(signupTodoDatabase(data))
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-center">
      <div className="w-full md:flex">
        <div className="hidden md:block w-1/2">
          {/* Replace with your own photo */}
          <img src={image1} alt="Signup" className="w-full h-full object-fill" />
        </div>
        <div className="w-full md:w-1/2 p-8 bg-slate-50  rounded-lg shadow-md"  >
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form className='bg-white rounded-lg p-2 shadow-lg ' onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div className="mt-4 flex justify-between my-2 text-blue-600 font-medium text-base">
          {/* <Link to={"/forgot-password"} className="hover:underline">Forgot Password?</Link> */}
          <Link to={"/login"} className="hover:underline ">Already Have An Account ! 😁</Link>
        </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </button>
          </form>
          
        </div>
      </div>

      {/* OTP Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">OTP Verification</h3>
            <p className="mb-4">Please enter the OTP sent to your email.</p>
            <input
              type="text"
              placeholder="Enter OTP"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={closeDialog}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={closeDialog}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;

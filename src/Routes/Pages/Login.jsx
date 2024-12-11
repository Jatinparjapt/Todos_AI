import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import image1 from "../../images/image2.png"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { LuLogIn } from "react-icons/lu";
import { useDispatch , useSelector} from 'react-redux';

import { loginTodoDatabase } from '../../Redux_Toolkit/loginSlice';
import toast from 'react-hot-toast';
import cookie from "js-cookie"
// Define the validation schema using Yup
const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const LoginPage = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=>(state.login))
  console.log(data, " loign ")
  const message = data.response
  const status = data.apiCallStatus
  // console.log(data.response.message)
  // Initialize react-hook-form with yupResolver
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
   console.log(data)
  }, [dispatch])
  
  const onSubmit = (data) => {
    console.log('Form data:', data);
    dispatch(loginTodoDatabase(data))
    cookie.set("name","Jaitn ji")
    console.log(status, "staus")
    if(status === 200){
      toast.success(message)
    }
    else{
      toast.error(message)
    }

  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-contain bg-center"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <div className="p-8 rounded-lg max-w-sm w-full ">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 flex justify-center items-center text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log In <LuLogIn className='mx-2 text-xl'/>
          </button>
        </form>

        <div className="mt-4 flex justify-between text-base text-white">
          <Link to={"/forgot-password"} className="hover:underline">Forgot Password?</Link>
          <Link to={"/register"} className="hover:underline">Create New Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

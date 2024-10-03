"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Cookies from "js-cookie";
import { post } from '@/lib/Api';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordToggle = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const newData: any = await post("user/login", formData);
      // console.log(newData, "new Data signin----");
      if (newData.success) {
        Cookies.set('token', newData.data.accessToken);
        Cookies.set('role', newData.data.user.role);
        Cookies.set('name', newData.data.user.username)
        router.push("/");
      } else {
        console.log("error")
      }
    } catch (error) {
     console.log(error)
    }
  };

  return (
    <div className="signup-form flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="lg:w-[36%] mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleOnChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@example.com"
          />
        </div>

        <div className="mb-6 ">       
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
         <div className='flex'>
         <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleOnChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
            placeholder="********"
          />
          <button
            type="button"
            onClick={handlePasswordToggle}
            className="relative ml-[-45px]"
          >
            {isPasswordVisible ? (
              <span className="material-icons m-auto">Hide</span>
            ) : (
              <span className="material-icons mt-10 pt-10">Show</span>
            )}
          </button>
         </div>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Sign In</button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <Link href="/auth/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Page;
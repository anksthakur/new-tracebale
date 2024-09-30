"use client"
import { toasterError, toasterSuccess } from '@/app/components/core/Toaster';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Cookies from "js-cookie";
import { post } from '@/lib/Api';

const page = () => {
  const router = useRouter();
  const [formData,setformdata] = useState({
    email:"",
    password:"",
  });
  const handleOnchange = (event:any)=>{
    const {name,value} = event?.target
    setformdata((pre:any)=>({
      ...pre ,
      [name]:value
    }))
  }

  const handleSubmit = async (event:any)=>{
    event.preventDefault();
    const newData:any = await post("user/login",formData)
    console.log(newData)
  
    if(newData.success){
      toasterSuccess("Signup successfully")
      Cookies.set('token',newData.data.accessToken);
      router.push("/");
    }else{
      toasterError("Login failed")
    }
  }

  return (
    <>
 
 <div className="signup-form flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="lg:w-[36%] mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleOnchange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleOnchange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" onClick={handleSubmit}>Sign In</button>
        <p className="mt-4 text-center text-gray-600">Don't have an account? <Link href="/auth/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
      </form>

     
    </div>
    </>
  )
}

export default page
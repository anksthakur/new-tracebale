"use client"
import { post } from '@/lib/Api';
import Link from 'next/link'
import React, { useState } from 'react'
import Cookies from "js-cookie";
import { toasterError, toasterSuccess } from '@/app/components/core/Toaster';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
const [formData,setformdata] = useState({
  email:"",
  username:"",
  password:"",
  confirmpassword:""
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
    const newData:any = await post("user/signup",formData)
    console.log(newData)
  
    if(newData.success){
      toasterSuccess("Signup successfully")
      Cookies.set('token',newData.data.accessToken);
      router.push("/auth/signin");
    }else{
      toasterError("Login failed")
    }
  }
  return (
    <>
   <div className="signup-form flex justify-center items-center h-screen">
        <form method= "POST" className="lg:w-[36%] mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={formData.username}
            onChange={handleOnchange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleOnchange}
            value={formData.email}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@example.com"
          />
        </div>

        <div className="mb-4">
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

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            required
            onChange={handleOnchange}
            value={formData.confirmpassword}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"onClick={handleSubmit}>Sign Up</button>
      <p className="mt-4 text-center text-gray-600">Already have an account? <Link href="/auth/signin" className="text-blue-500 hover:underline">Log in</Link></p>

      </form>

    </div>
    </>
  )
}

export default page
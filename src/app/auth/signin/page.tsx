"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
  const [formData ,setformData]=useState([{
    email:"",
    password:"",
  }])


  return (
    <>
 
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form action="" method="POST">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            required
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
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Sign In</button>
      </form>

      <p className="mt-4 text-center text-gray-600">Don't have an account? <Link href="/auth/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
    </div>
    </>
  )
}

export default page
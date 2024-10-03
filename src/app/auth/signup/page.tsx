"use client";
import { post } from '@/lib/Api';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmpassword: string;
}

const Page: React.FC = () => {
  const router = useRouter();
  
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    username: "",
    password: "",
    confirmpassword: ""
  });
  
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormValues> = {};
    
    if (!formValues.username) {
      newErrors.username = "Full Name is required";
    }
    
    if (!formValues.email) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email Address is invalid";
    }
    
    if (!formValues.password) {
      newErrors.password = "Password is required";
    } else if (formValues.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formValues.confirmpassword) {
      newErrors.confirmpassword = "Confirm Password is required";
    } else if (formValues.confirmpassword !== formValues.password) {
      newErrors.confirmpassword = "Passwords must match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return; 
    }

    try {
      const newData: any = await post("user/signup", formValues);
      if (newData.success) {
        router.push("/auth/signin");
      } 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-form flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="lg:w-[36%] mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">Full Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
          {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@example.com"
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
          {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            value={formValues.confirmpassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
          {errors.confirmpassword && <div className="text-red-500 text-sm">{errors.confirmpassword}</div>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link href="/auth/signin" className="text-blue-500 hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Page;

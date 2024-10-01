"use client";
import { post } from '@/lib/Api';
import Link from 'next/link';
import React from 'react';
import Cookies from "js-cookie";
import { toasterError, toasterSuccess } from '@/app/components/core/Toaster';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  email: string;
  username: string;
  password: any;
  confirmpassword: any;
}

const Page: React.FC = () => {
  const router = useRouter();

  const initialValues: FormValues = {
    email: "",
    username: "",
    password: "",
    confirmpassword: ""
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username cannot exceed 20 characters')
      .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
      .notOneOf(['admin', 'user', 'test'], 'This username is not allowed')
      .required('Required'),
    
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('Required'),
    
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), ""], 'Passwords must match')
      .required('Required')
  });
  

  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const newData: any = await post("user/signup", values);

    if (newData.success) {
      toasterSuccess("Signup successful");
      //Cookies.set('token', newData.data?.accessToken);
      router.push("/auth/signin");
    } else {
      toasterError("Signup failed");
    }
    setSubmitting(false);
  };

  return (
    <div className="signup-form flex justify-center items-center h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="lg:w-[36%] mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">Full Name</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@example.com"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="confirmpassword">Confirm Password</label>
              <Field
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
              />
              <ErrorMessage name="confirmpassword" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Sign Up
            </button>

            <p className="mt-4 text-center text-gray-600">
              Already have an account? <Link href="/auth/signin" className="text-blue-500 hover:underline">Log in</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page;

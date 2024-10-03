"use client";
import Cookies from "js-cookie";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const headers = {
  'Content-Type': 'application/json',
};

const storedToken = Cookies.get("token");
const shownMessages = new Set();

const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  if (shownMessages.has(message)) return;
  shownMessages.add(message);

  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    backgroundColor: type === 'error' ? 'red' : 'green',
  }).showToast();
};

export async function get<T>(url: string): Promise<T> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        ...headers,
      },
    });

    const data = await response.json();
console.log(data,"999999999")
    if (!response.ok) {
      showToast(data.message || 'Error occurred while fetching data', 'error');
      throw new Error(`Error: ${response.statusText}`);
    }

    showToast('Login Successfully!', 'success');
    return data;
  } catch (error: any) {
    console.error('GET Error:', error);
    showToast(error.message || 'An unexpected error occurred', 'error');
    throw error;
  }
}

export async function post<T>(url: string, data: unknown): Promise<T> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      method: 'POST',
      headers: {
        ...headers,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json(); 
    console.log('Response Data:', responseData);

    if (!response.ok) {
      if (responseData.error.code === "ERR_AUTH_USERNAME_OR_EMAIL_ALREADY_EXIST") {
        showToast('Username is already taken', 'error');
      } else if (responseData.error.code === "ERR_AUTH_EMAIL_ALREADY_EXIST") {
        showToast('Email is already registered', 'error');
      } 
      throw new Error(responseData.error.message || 'check your email & username');
    }
    showToast('Successfully!', 'success');   
    return responseData; 
  } catch (error: any) {
    console.error('POST Error:', error); 
    showToast(error.message || 'An unexpected error occurred', 'error');
    throw error;
  }
}


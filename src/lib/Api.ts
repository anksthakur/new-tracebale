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

    if (!response.ok) {
      const errorData = await response.json();
      showToast(errorData.message || 'Error occurred while fetching data', 'error');
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    showToast('Account created successfully!', 'success');
    return data;
  } catch (error: any) {
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

    if (!response.ok) {
      const errorMessage = responseData?.error?.message || "Check your password";
      showToast(errorMessage, 'error');
      throw {
        message: errorMessage,
      };
    }

    showToast('Login successfully!', 'success');
    return responseData;
  } catch (error: any) {
    showToast(error.message || 'An unexpected error occurred', 'error');
    throw error;
  }
}

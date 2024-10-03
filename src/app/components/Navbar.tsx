"use client";
import Link from 'next/link';
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole,setuserRole] = useState<any>('');
    const [userName,setuserName] = useState<any>('')

    useEffect(() => {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);
       const role = Cookies.get('role');
       setuserRole(role || '');
       const name = Cookies.get('name')
       setuserName(name || '')
    }, []);

    const handleLogout = () => {
       try {
         Cookies.remove('token'); 
         Cookies.remove('role');
         Cookies.remove('name');
         router.push("/auth/signin"); 
       } catch (error) {
        console.error('Logout error:', error);
       }
    };   

    return (
        <div>
            <nav className="bg-blue-800">
                <div className="max-w-full mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-white text-lg font-bold">Tracebale</div>
                    <div className="hidden md:flex space-x-4">
                        {userRole === 'admin' && ( <>
                            <Link href="/admin" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Admin</Link>
                            <Link href="/ginner" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Ginner</Link>
                            <Link href="/spinner" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Spinner</Link>
                            <Link href="/knitter" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Knitter</Link>
                            </> ) }
                            {userRole === 'ginner' && (
                            <Link href="/ginner" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Ginner</Link>
                            ) }
                            {userRole === 'spinner' && (
                            <Link href="/spinner" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Spinner</Link>
                            )}
                            {userRole === 'knitter' && (
                            <Link href="/knitter" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Knitter</Link>
                            )}
                    </div>
                    <div className='flex items-center gap-2'>
                        <h3 className='text-white'>{userName}</h3>
                        <button
                            className='text-white px-2 py-2 border rounded-lg hover:bg-black hover:text-red-500'
                            onClick={isLoggedIn ? handleLogout : () => router.push("/auth/signin")}
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

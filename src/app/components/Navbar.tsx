"use client"
import Link from 'next/link';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';
import { toasterSuccess } from './core/Toaster';


const Navbar = () => {
    const router = useRouter();
    const storedToken = Cookies.get("token");
    const handleLogout = () => {
        if (storedToken) {
          Cookies.remove('token'); 
          toasterSuccess("Logged out successfully",3000,"id");
          router.push("/auth/signin"); 
        } else {
          router.push("/auth/signin");
        }
      };
    return (
        <>
            <div>
                <nav className="bg-blue-800 ">
                    <div className="max-w-full mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="text-white text-lg font-bold">Tracebale</div>
                        <div className="hidden md:flex space-x-4">
                            <Link href="/" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Admin</Link>
                            <Link href="/ginner" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Ginner</Link>
                            <Link href="/spinner" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Spinner</Link>
                        </div>
                        <div className='flex items-center gap-2'>
                            <h3 className='text-white'>name</h3>
                            {/* {storedToken ? (<button className='text-white px-2 py-2 border rounded-lg  hover:bg-black hover:text-red-500'
                            onClick={logOut}>Logout</button>):<button className='text-white px-2 py-2 border rounded-lg  hover:bg-black hover:text-red-500'><Link href="/auth/signin">Login</Link></button>} */}
                            <button className='text-white px-2 py-2 border rounded-lg  hover:bg-black hover:text-red-500'
                            onClick={handleLogout}>{storedToken ? "Logout":"Login"}</button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
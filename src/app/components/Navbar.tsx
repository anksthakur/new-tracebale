"use client"
import Link from 'next/link';

const Navbar = () => {

    return (
        <>
            <div >
                <nav className="bg-blue-800 ">
                    <div className="max-w-full mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="text-white text-lg font-bold">Tracebale</div>
                        <div className="hidden md:flex space-x-4">
                            <Link href="/" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">Home</Link>
                            <Link href="/about" className="text-white hover:bg-black hover:text-red-500 px-3 py-2 rounded-lg">About</Link>
                        </div>
                        <div className='flex items-center gap-2'>
                            <h3 className='text-white'>Name</h3>
                            <button className='text-white px-2 py-2 border rounded-lg  hover:bg-black hover:text-red-500'>Signin</button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black text-white shadow-lg w-full z-10">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div>
                    <Link to="/" className="text-2xl font-bold transition duration-300 transform hover:scale-105">Inventory Management</Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    <Link to="/inventory" className="border border-neon-green text-center text-neon-green py-2 px-4 rounded-lg transition duration-300 hover:bg-neon-green hover:text-black">
                        Inventory
                    </Link>
                    <Link to="/suppliers" className="border border-neon-green text-center text-neon-green py-2 px-4 rounded-lg transition duration-300 hover:bg-neon-green hover:text-black">
                        Suppliers
                    </Link>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black p-4 ">
                    <Link to="/inventory" className="block py-2 w-1/2 text-center border border-neon-green text-neon-green rounded-lg transition duration-300 hover:bg-neon-green hover:text-black">Inventory</Link>
                    <Link to="/suppliers" className="block py-2 w-1/2 text-center border border-neon-green text-neon-green rounded-lg transition duration-300 hover:bg-neon-green hover:text-black">Suppliers</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

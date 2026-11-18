'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Topnav: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();
    const { openCart, items } = useCart();
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

    return (
        <nav
        className="w-full text-white p-4 md:p-6 lg:p-8 flex justify-between items-center text-sm md:text-base lg:text-lg font-serif"
        style={{position: 'absolute', top: 0, zIndex: 10, background: 'linear-gradient(to bottom, black, transparent)', userSelect: 'none' }}
        >
            {/* Left side: Logo + Nav Links */}
            <div className="flex pl-10 items-center space-x-6 md:space-x-10 lg:space-x-12">
                <Link href="/" className="flex items-center" title="Home">
                  <Image
                    src="/icons/logo.png"
                    alt="doghauss"
                    className="h-28 md:h-32 lg:h-36 xl:h-40 w-auto"
                    width={160}
                    height={160}
                    priority
                  />
                </Link>
                <div className="hidden md:flex items-center space-x-6 md:space-x-10">
                    <Link href="/" className="truncate hover:text-[#F05A19] transition-colors" title="Home">Home</Link>
                    <Link href="/" className="truncate hover:text-[#F05A19] transition-colors" title="Hotdogs">Hotdogs</Link>
                    <Link href="/" className="truncate hover:text-[#F05A19] transition-colors" title="Contact Us">Contact Us</Link>
                </div>
            </div>

            {/* Right side: Login/Account (left of cart) + Cart (rightmost) */}
            <div className="pr-10 flex items-center space-x-4 md:space-x-6">
                {/* Login / Account - positioned left of cart */}
                {isLoggedIn ? (
                    <div className="relative group">
                        <button className="hover:text-[#F05A19] transition-colors" title="Account">
                            Account
                        </button>
                        <div className="absolute text-base right-0 mt-2 w-48 bg-[#1f1f1fbe] text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                            <Link href="/Account" className="block px-4 py-2 hover:bg-gray-700">Account Info</Link>
                            <Link href="/History" className="block px-4 py-2 hover:bg-gray-700">Purchase History</Link>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-700">Logout</button>
                        </div>
                    </div>
                ) : (
                    <Link href="/Login" className="hover:text-[#F05A19] transition-colors" title="Login">Login</Link>
                )}

                {/* Cart - rightmost */}
                <button
                    onClick={openCart}
                    className="flex items-center space-x-2 hover:text-[#F05A19] transition-colors"
                >
                    <span>Cart</span>
                    {itemCount > 0 && (
                        <span className="bg-[#6C1814] px-2 py-0.5 rounded-full text-xs">
                            {itemCount}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Topnav;
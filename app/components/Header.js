'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LoginDialog } from './LoginDialog';
import { useAuth } from '@/app/context/AuthContext';


export default function Header() {
    const [textSize, setTextSize] = useState(1);
    const [language, setLanguage] = useState('English');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuth();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const adjustTextSize = (increment) => {
        setTextSize(prev => Math.min(Math.max(0.8, prev + increment), 1.4));
    };

    const toggleContrast = () => setHighContrast(!highContrast);

    return (
        <header style={{ fontSize: `${textSize}rem` }}>
            {/* Top bar with contact and accessibility options */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-10 text-sm">
                        {/* Contact Information */}
                        <div className="flex items-center space-x-4">
                            <a href="mailto:contact@citizenportal.gov.in" className="text-gray-600 hover:text-blue-600 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                contact@citizenportal.gov.in
                            </a>
                            <span className="text-gray-400">|</span>
                            <a href="tel:1800-XXX-XXXX" className="text-gray-600 hover:text-blue-600 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                1800-XXX-XXXX
                            </a>
                        </div>
                        {/* Text Size Controls */}
                        <div className="flex items-center space-x-2 border-r border-gray-300 pr-4 mr-4">
                            <span className="text-gray-600">Text Size:</span>
                            <button
                                onClick={() => adjustTextSize(-0.1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded"
                                aria-label="Decrease text size"
                            >
                                A-
                            </button>
                            <button
                                onClick={() => adjustTextSize(0.1)}
                                className="w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded"
                                aria-label="Increase text size"
                            >
                                A+
                            </button>
                        </div>

                        {/* Language Selector */}
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-transparent text-gray-700 text-sm border-0 cursor-pointer hover:text-blue-600 focus:ring-0 focus:outline-none"
                        >
                            <option value="English">English</option>
                            <option value="Hindi">हिंदी</option>
                            <option value="Marathi">मराठी</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo and Brand */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-2xl">GOV</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-gray-900">Citizen Portal</span>
                                    <span className="text-sm text-gray-600">Government Services</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                                Home
                            </Link>
                            <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                                Services
                            </Link>
                            <Link href="/locate" className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                                Locate Centers
                            </Link>
                            <Link href="/apply" className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                                Apply
                            </Link>
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-700">Welcome, {user.phoneNumber}</span>
                                    <button
                                        onClick={() => auth.signOut()}
                                        className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <LoginDialog />
                            )}
                        </nav>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                                aria-expanded={isMenuOpen}
                            >
                                <span className="sr-only">Open menu</span>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="md:hidden py-4 border-t border-gray-200">
                            <nav className="space-y-2">
                                <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                                    Home
                                </Link>
                                <Link href="/services" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                                    Services
                                </Link>
                                <Link href="/locate" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                                    Locate Centers
                                </Link>
                                <Link href="/apply" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
                                    Apply
                                </Link>
                                <div className="px-4 pt-4 border-t border-gray-200 mt-2">
                                    {user ? (
                                        <div className="flex flex-col space-y-2">
                                            <span className="text-gray-700">Welcome, {user.phoneNumber}</span>
                                            <button
                                                onClick={() => auth.signOut()}
                                                className="text-center bg-gray-100 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-200 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    ) : (
                                        <LoginDialog />
                                    )}
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

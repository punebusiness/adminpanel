'use client'
import React, { useState } from 'react';
import Link from 'next/link'
const HeroSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="h-64 bg-blue-500 flex items-center justify-center text-white relative">
        <h1 className="text-4xl font-bold animate__animated animate__fadeIn">
          Empowering Education, Enriching Lives!
        </h1>
      </div>

      {/* Sidebar Button */}
      <div
        className="absolute top-4 right-4 cursor-pointer text-white"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-1/1 bg-gray-800 p-4 ${
          isSidebarOpen
            ? 'animate__animated animate__slideInRight'
            : 'hidden animate__animated animate__slideOutRight'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold text-white">Menu</p>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul>
          <li className="mt-2">
            <Link href="/admin-login" className="text-blue-300 hover:text-blue-400">
              Admin Login
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/institute-login" className="text-blue-300 hover:text-blue-400">
              Institute Login
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/student-login" className="text-blue-300 hover:text-blue-400">
              Student Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeroSection;

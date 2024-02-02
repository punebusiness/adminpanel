'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative overflow-hidden h-screen">
      {/* Hero Section with Curved Bottom */}
      <div className="h-2/3 flex flex-column items-center justify-center relative animate__animated animate__fadeInLeft">
        <h1 className="text-4xl font-bold animate__animated animate__fadeIn">
          Empowering Education, Enriching Lives!
        </h1>
        <p className="mt-3 h3">Grow With Us!</p>
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#3498db"
          fillOpacity="1"
          d="M0,192L48,186.7C96,181,192,171,288,186.7C384,203,480,245,576,229.3C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      {/* Sidebar Button */}
      <div
        className="absolute top-4 right-4 cursor-pointer"
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
            <Link href="/admin/login" className="text-blue-300 hover:text-blue-400">
              Admin Login
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/institute/login" className="text-blue-300 hover:text-blue-400">
              Institute Login
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/student-registration" className="text-blue-300 hover:text-blue-400">
              Student Registration
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/student/idcard" className="text-blue-300 hover:text-blue-400">
              Student ID Card
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeroSection;

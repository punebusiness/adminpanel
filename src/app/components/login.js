"use client"
import 'animate.css';

const LoginPage = ({page}) => {
  return (
    <div className="flex h-screen">
      {/* Left Section - Logo and Form */}
      <div className="hidden md:flex flex-col items-center justify-center flex-1 bg-gray-200 p-8">
        {/* Dummy Logo */}
        <img
          src="https://img.logoipsum.com/331.svg"
          alt="Logo"
          className="mb-4"
          style={{ width: '100px', height: '100px' }}
        />

        {/* Login Form */}
        <form className="w-full max-w-sm" method="post" action="/api/login">
        <input type="text" defaultValue={page} name="type" style={{display:"none"}} />
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
             {page} Email
            </label>
            <input
              type="email"
              id="email"
              name={page+"email"}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
             {page} Password
            </label>
            <input
              type="password"
              id="password"
              name={page+"password"}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
      </div>

      {/* Right Section - University Image */}
      <div className="md:flex-1 hidden md:flex bg-blue-500 bg-opacity-75 relative">
        {/* Animated Slogan */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-4xl font-bold animate__animated animate__fadeIn">
            Empowering Minds, Building Futures!
          </h1>
        </div>

        {/* University Image */}
        <img
          src="https://cdn.pixabay.com/photo/2017/09/08/00/38/friend-2727307_1280.jpg"
          alt="University Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Mobile Section */}
      <div className="md:hidden flex flex-col items-center justify-center bg-gray-200 p-8">
        {/* Dummy Logo */}
        <img
          src="https://img.logoipsum.com/331.svg"
          alt="Logo"
          className="mb-4"
          style={{ width: '100px', height: '100px' }}
        />

        {/* Login Form */}
        <form className="w-full max-w-sm" method="post" action="/api/login">
          <input type="text" defaultValue={page} name="type" style={{display:"none"}} />
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
             {page} Email
            </label>
            <input
              type="email"
              id="email"
              name={page+"email"}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
            {page}  Password
            </label>
            <input
              type="password"
              id="password"
              name={page+"password"}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

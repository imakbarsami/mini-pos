import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiLogIn } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Error = () => {

  const user = useSelector((state) => state.auth.user);
  // console.log("User:",user);

  return (
    <section className="bg-white flex items-center justify-center min-h-[100vh]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            Something's missing.
          </p>
          <p className="mb-8 text-lg font-light text-gray-500">
            Sorry, we can't find the page you're looking for. Let's get you back on track.
          </p>

          {
            user ?
              (<Link
                to="/"
                className="inline-flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors shadow-sm"
              >
                <FiHome size={18} /> Back to Dashboard
              </Link>) :
              (<Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors shadow-sm"
              >
                <FiLogIn size={18} /> Login
              </Link>)
          }
        </div>
      </div>
    </section>
  );
};

export default Error;
import React from 'react';
import Navbar from '../pages/Navbar';
import { Link } from 'react-router-dom';

const Accomodations = () => {
  return (
    <>
      <Navbar />
      
      <Link
        className="flex  w-56 relative top-32 items-center justify-center text-2xl text-white bg-red-500  rounded-full p-4 hover:bg-slate-400 transition duration-300 ease-in-out"
        to={'/places/new'}
      >
        <span className="mr-2">New Places</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
      </>
  );
};

export default Accomodations;

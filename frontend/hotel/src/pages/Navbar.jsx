import { useContext, useEffect } from 'react';
import { UserContext } from '../UseContext.jsx';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useContext(UserContext);
  console.log("user is:", user);

  useEffect(() => {
    console.log("User context updated:", user);
  }, [user]);

  return (
    <div className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className='flex justify-between items-center px-6 py-4'>
        <Link to={'/'} className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-red-500 transform rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
          <span className='text-red-500 text-3xl font-semibold'>airbnb</span>
        </Link>

        <div className="flex-1 mx-1">
          <div className="flex justify-around bg-gray-100 rounded-full p-2 border border-gray-300 shadow-md">
            <button className='btn bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition'>Anywhere</button>
            <button className='btn bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition'>Add guests</button>
            <button className='btn bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition'>Any week</button>
            <div className="flex items-center text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a href="#" className="flex items-center bg-white text-black px-4 py-2 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 transition">
            Airbnb your home
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </a>

          <Link to={user ? '/account' : '/login'} className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            {user && (
              <div className='text-black'>
                {user.user?.name}
                {console.log(user.user?.name)}
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

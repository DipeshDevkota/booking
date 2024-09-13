import { useEffect, useState } from 'react';
import Navbar from '../pages/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Accomodations = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);  // For handling any errors

  useEffect(() => {
    // Fetch places when component mounts
    axios.get('http://localhost:3000/api/place/getallplaces', { withCredentials: true })
      .then(({ data }) => {
        setPlaces(data);  // Set places from response
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
        setError('Failed to fetch places. Please log in.');
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="text-center relative top-32">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">List Of All Added Places</h1>
            {places.length > 0 ? (
              <ul className="mt-4">
                {places.map((place) => (
                  <li key={place._id} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold">{place.title}</h2>
                    <p>{place.description}</p>
                    <span>Address: {place.address}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No places added yet.</p>
            )}
          </>
        )}
      </div>
      <Link
        className="flex w-56 relative top-32 items-center justify-center text-2xl text-white bg-red-500 rounded-full p-4 hover:bg-slate-400 transition duration-300 ease-in-out"
        to={'/places/new'}
      >
        <span className="mr-2 text-center">New Places</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </Link>
    </>
  );
};

export default Accomodations;

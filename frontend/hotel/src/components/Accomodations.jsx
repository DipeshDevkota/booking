import { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Accomodations = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/place/places",
          { withCredentials: true }
        );
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("Failed to fetch places. Please log in.");
      }
    };

    fetchPlaces();
  }, []);

  const ondelete = async (id) => {
    try {
      await axios.post(
        `http://localhost:3000/api/place/delete/${id}`,
        {},
        { withCredentials: true }
      );
      setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== id));
    } catch (error) {
      console.log("Error deleting place:", error);
    }
  };

  return (
    <>
      <Navbar className="z-9999" />

      <div className="container mx-auto p-4 bg-gray-50 min-h-screen w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            List of All Added Places
          </h1>
          {error && <p className="text-red-500 text-lg">{error}</p>}
        </div>

        {places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place) => (
              <div
                key={place._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {place.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${place.title} image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>

                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  {place.title}
                </h2>
                <p className="text-gray-600 mb-2">{place.description}</p>
                <p className="text-gray-600 mb-2">Address: {place.address}</p>
                <p className="text-gray-600 mb-2">Extra Info: {place.extraInfo}</p>
                <p className="text-gray-600 mb-2">Check-In: {place.checkIn}</p>
                <p className="text-gray-600 mb-2">Check-Out: {place.checkOut}</p>
                <p className="text-gray-600 mb-4">Max Guests: {place.maxGuests}</p>
                <p className="text-gray-600 mb-4">Price: {place.price}</p>


                <button
                  className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
                  onClick={() => ondelete(place._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-4 text-lg">
            No places added yet.
          </p>
        )}

        <div className="mt-8 text-center">
          <Link
            className="inline-flex items-center justify-center px-6 py-3 text-xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            to={"/places/new"}
          >
            Add New Place
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Accomodations;

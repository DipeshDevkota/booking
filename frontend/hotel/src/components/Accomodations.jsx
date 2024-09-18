import { useEffect, useState } from "react";
import Navbar from "../pages/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Accomodations = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null); // For handling any errors

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // Fetch places when the component mounts
        const response = await axios.get(
          "http://localhost:3000/api/place/places",
          { withCredentials: true }
        );

        // Log the response for debugging purposes
        console.log("Response is:", response);

        // Set places from the response
        setPlaces(response.data);
      } catch (error) {
        // Handle any errors during the fetch operation
        console.error("Error fetching places:", error);
        setError("Failed to fetch places. Please log in.");
      }
    };

    fetchPlaces();
  }, []);

  const ondelete = async (id) => {
    try {
      // Make a POST request to the server with the specific place ID
      const response = await axios.post(
        `http://localhost:3000/api/place/delete/${id}`,
        {},
        { withCredentials: true }
      );

      // Optionally log the response
      console.log("Delete response:", response);

      // Update the state to remove the deleted place from the list
      setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== id));
    } catch (error) {
      console.log("Error deleting place:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            List of All Added Places
          </h1>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        {places.length > 0 ? (
          <ul className="space-y-6">
            {places.map((place) => (
              <li
                key={place._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="p-6 flex items-center">


                  <img
                    className="h-24 w-24 object-cover rounded-full border border-gray-300"
                    src={place.image}
                    alt={place.title}
                  />
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {place.title}
                    </h2>
                    <p className="text-gray-600 mb-2">{place.description}</p>
                    <span className="block text-gray-500">{place.address}</span>
                  <button
                    className="ml-4 px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition"
                    onClick={() => ondelete(place._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center mt-4">No places added yet.</p>
        )}
        <div className="mt-8 text-center">
          <Link
            className="inline-flex items-center justify-center px-6 py-3 text-xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
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

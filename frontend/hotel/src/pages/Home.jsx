import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

const Home = () => {

  const [places,setPlaces] = useState([]);
  const [error,setError]= useState()
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
  },[]);
  return (

<div>
  <Navbar />

  <div className="places mt-24">
  {places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {places.map((place) => (
              <div key={place._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <img src={place.image[0]} alt={`${place.title} image 1`} className="w-full h-48 object-cover rounded-lg" />
                  <img src={place.image[1]} alt={`${place.title} image 2`} className="w-full h-48 object-cover rounded-lg" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{place.title}</h2>
                <p className="text-gray-600 mb-2 text-lg">Address: {place.address}</p>
                <p className="text-gray-600 mb-2 font-bold text-lg">Price: ${place.price}<span className='text-black ml-2'>per night</span> </p>

 

              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-4 text-lg">No places added yet.</p>
        )}
  </div>
</div>

  )
}

export default Home
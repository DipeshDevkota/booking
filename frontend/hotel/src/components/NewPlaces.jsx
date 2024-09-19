import { useState } from 'react';
import axios from 'axios';
import Navbar from '../pages/Navbar';

const NewPlaces = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState(null); 
  const [photoLink, setPhotoLink] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [newPerk, setNewPerk] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  const handleAddPerk = () => {
    if (newPerk.trim() !== '') {
      setPerks([...perks, newPerk]);
      setNewPerk('');
    }
  };

  const handleRemovePerk = (perkToRemove) => {
    setPerks(perks.filter(perk => perk !== perkToRemove));
  };

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/place/add', { link: photoLink });
      setAddedPhotos([...addedPhotos, data.place.image[0]]);
      setPhotoLink('');
    } catch (error) {
      console.error('Error uploading photo by link', error);
    }
  };

  const uploadPhoto = async (e) => {
    e.preventDefault();
    if (!photos) return;

    try {
      const formData = new FormData();
      formData.append('image', photos);

      const response = await axios.post('http://localhost:3000/api/place/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setAddedPhotos(prev => [...prev, response.data.place.image[0]]);
    } catch (error) {
      console.error('Error uploading photo', error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPhotos(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      photos: addedPhotos,
    };
  
    try {
      const response = await axios.post('http://localhost:3000/api/place/formsubmit', formData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Navbar className='z-9999'/>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Add New Place</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Title</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Address</h2>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Photos Section */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Photos</h2>
            <input
              type="text"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
              placeholder="Add photo URL"
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addPhotoByLink}
              className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300"
            >
              Add Photo by Link
            </button>
            <input
              type="file"
              onChange={handleFileUpload}
              className="p-3 border border-gray-300 rounded-lg w-full bg-gray-50 text-gray-700 mt-4"
            />
            <button
              onClick={uploadPhoto}
              className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300 mt-4"
            >
              Upload Photo
            </button>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Added Photos:</h3>
              <div className="grid grid-cols-3 gap-4">
                {addedPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt="Uploaded"
                    className="w-full h-40 object-cover rounded-lg shadow-lg"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Description</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Perks */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Perks</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPerk}
                onChange={(e) => setNewPerk(e.target.value)}
                placeholder="Add a perk"
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddPerk}
                className="bg-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300"
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {perks.map((perk, index) => (
                <li key={index} className="flex justify-between items-center py-1">
                  <span>{perk}</span>
                  <button
                    onClick={() => handleRemovePerk(perk)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Extra Info */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Extra Information</h2>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              placeholder="Enter extra information"
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Check-In & Check-Out Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Check-In Time</h2>
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="Enter check-in time"
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Check-Out Time</h2>
              <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="Enter check-out time"
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Max Guests */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Max Guests</h2>
            <input
              type="number"
              min="1"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPlaces;
  
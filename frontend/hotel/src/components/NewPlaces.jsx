import { useState } from 'react';
import axios from 'axios';

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

  // Add a perk to the list
  const handleAddPerk = () => {
    if (newPerk.trim() !== '') {
      setPerks([...perks, newPerk]);
      setNewPerk('');
    }
  };

  // Remove a perk from the list
  const handleRemovePerk = (perkToRemove) => {
    setPerks(perks.filter(perk => perk !== perkToRemove));
  };

  // Add a photo by URL link
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/place/add', { link: photoLink });
      console.log('Added photo response:',data);
      console.log('Added photo response:',data.place.image[0]);

      setAddedPhotos([...addedPhotos, data.place.image[0]]);
      setPhotoLink('');
    } catch (error) {
      console.error('Error uploading photo by link', error);
    }
  };

  // Handle photo upload via file input
  const uploadPhoto = async (e) => {
    console.log('Photo is',e)
    e.preventDefault();
    if (!photos) {
      console.error('No files selected');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('image', photos);
  
      const response = await axios.post('http://localhost:3000/api/place/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      const { data: filename } = response;
      setAddedPhotos(prev => [...prev, filename]); 
    } catch (error) {
      console.error('Error uploading photo', error);
    }
  };
  
  // Handle file selection
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotos(file);
    }
  };

  // Submit form data to backend
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
      photos: addedPhotos // Match backend photos field
    };

    try {
      const response = await axios.post('http://localhost:3000/api/place/formsubmit', formData);
      console.log('Response:', response.data);
      // setMessage('Place created successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      // setMessage('Failed to create place. Please check your input.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800 text-center">Add New Place</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Photos */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Photos</label>
            <input
              type="text"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
              placeholder="Add using a link (e.g., ...jpg)"
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addPhotoByLink}
              className="bg-gray-200 px-4 py-2 rounded-2xl text-gray-700 hover:bg-gray-300"
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
              className="bg-gray-200 px-4 py-2 rounded-2xl text-gray-700 hover:bg-gray-300"
            >
              Upload Photo
            </button>
          </div>

          {/* Added Photos */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Added Photos:</h3>
            <div className="grid grid-cols-3 gap-4">
  {addedPhotos.map((photo, index) => {
    console.log('Photo is', photo); // Log each photo URL to the console

    return (
      <img
        key={index}
        src={photo} // Use the URL directly
        alt="Uploaded"
        className="w-full h-40 object-cover rounded-lg shadow-lg"
      />
    );
  })}
</div>

          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Perks */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Perks</label>
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
                className="bg-gray-200 px-4 py-2 rounded-2xl text-gray-700 hover:bg-gray-300"
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
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Extra Info</label>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              placeholder="Enter extra information"
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Check-In / Check-Out */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2 text-lg font-medium text-gray-700">Check-In Time</label>
              <input
                type="time"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-lg font-medium text-gray-700">Check-Out Time</label>
              <input
                type="time"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Max Guests */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">Max Guests</label>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              placeholder="Enter max guests"
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Save Place
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPlaces;

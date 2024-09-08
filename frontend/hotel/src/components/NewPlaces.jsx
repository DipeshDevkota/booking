import  { useState } from 'react';

const NewPlaces = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState('');
  const [photoLink, setPhotoLink] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800 text-center">Add New Place</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          {/* Address Input */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Address
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          {/* Photos Inputs */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Photos
            </label>
            <input
              type="text"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
              placeholder="Add using a link (e.g., ...jpg)"
              className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              value={photos}
              onChange={(e) => setPhotos(e.target.files[0])}
              className="p-3 border border-gray-300 rounded-lg w-full bg-gray-50 text-gray-700"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Perks Section */}
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Perks</h4>
            <div className="flex flex-col gap-2 mb-4">
              {perks.map((perk, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <span>{perk}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePerk(perk)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newPerk}
                onChange={(e) => setNewPerk(e.target.value)}
                placeholder="Add new perk"
                className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddPerk}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add Perk
              </button>
            </div>
          </div>

          {/* Extra Info Input */}
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Extra Info
            </label>
            <textarea
              placeholder="Enter information"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Check-In & Check-Out Times */}
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-center text-gray-800 mb-6">Check-in & Check-out Times</h2>
            <div className="flex justify-center md:grid-cols-2 gap-4">
              {/* Check-in time */}
              <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <label className="block text-gray-600 text-sm font-medium mb-2">Check-in Time</label>
                <input
                  type="time"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Check-out time */}
              <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <label className="block text-gray-600 text-sm font-medium mb-2">Check-out Time</label>
                <input
                  type="time"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Max Guests */}
              <div className="p-4 bg-gray-100 rounded-lg shadow-md col-span-full">
                <label className="block text-gray-600 text-sm font-medium mb-2">Max Guests</label>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter number of guests"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPlaces;

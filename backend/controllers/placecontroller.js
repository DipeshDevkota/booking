const { findByIdAndDelete } = require('../model/User.model');
const Place = require('./placecontroller')



const addPlace = async (req, res) => {
    try {
      const { address, description } = req.body;
  
      // `req.file` is used to access the uploaded file (if any)
      let image = null;
      if (req.file) {
        image = req.file.filename;
      }
  
      // Assuming you have a Place model to save the place to your database
      const place = new Place({
        address,
        description,
        image, // Save the filename or image path
      });
  
      await place.save();
  
      res.status(201).json({ message: 'Place added successfully', place });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

const deletePlace = async (req, res) => {
    try {
      // Extract place ID from the request parameters
      const placeId = req.params.id;
  
      // Find the place by ID and delete it
      const place = await Place.findByIdAndDelete(placeId);
  
      // If the place is not found, return a 404 response
      if (!place) {
        return res.status(404).json({ message: 'Place not found' });
      }
  
      // If the place is found and deleted, return a success response
      return res.status(200).json({ message: 'Place deleted successfully' });
    } catch (error) {
      // Handle any server errors
      return res.status(500).json({ message: 'Server error', error });
    }
  };

  module.exports={
    addPlace,
    deletePlace
  }
  

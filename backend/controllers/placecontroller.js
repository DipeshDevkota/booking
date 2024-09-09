const { findByIdAndDelete } = require('../model/User.model');
const Place = require('./placecontroller')
const imagedownloader = require('image-downloader')
const path = require('path');

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

  const placeByLink = async (req, res) => {
    try {
      const { link } = req.body;
      if (!link) {
        throw new Error('No link provided');
      }
      
      console.log("Received link:", link); // Debug: Log the link received
      
      const newName = `${Date.now()}.jpg`;
      const dest = path.join(__dirname, '../uploads', newName);
      
      // Validate URL
      if (!/^https?:\/\/.+/.test(link)) {
        throw new Error('Invalid URL format');
      }
      
      await imagedownloader.image({
        url: link,
        dest: dest,
      });
      
      res.json({ message: 'Image downloaded successfully', imageName: newName });
    } catch (error) {
      console.error('Error downloading image:', error); // Detailed logging
      res.status(500).json({ message: 'Error downloading image', error });
    }
  };


  const uploadPhoto = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }
  
      // Log the uploaded file information
      console.log('photo is:', req.file);
  
      res.json({
        message: 'File uploaded successfully',
        file: req.file,
        filepath: `/photoupload/images/${req.file.filename}`
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: "Error uploading file" });
    }
  };
  

  module.exports={
    addPlace,
    deletePlace,
    placeByLink,
    uploadPhoto
  }
  

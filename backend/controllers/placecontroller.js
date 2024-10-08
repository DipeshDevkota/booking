const { findByIdAndDelete } = require('../model/User.model');
const Place = require('../model/Place.model')
const imagedownloader = require('image-downloader')
const path = require('path');
const {uploadOnCloudinary} = require('../config/cloudinary');
const multer = require('multer');
const fs = require('fs');

const jwt = require('jsonwebtoken');  // Add this line
const { promisify } = require('util');
// const { fstat } = require('fs');

// const placeByLink = async (req, res) => {
//   try {
//     const { link } = req.body;
//     if (!link) {
//       console.log("Link is",link)
//       throw new Error('No link provided');
//     }

//     console.log("Received link:", link); // Debug: Log the link received

//     const newName = `${Date.now()}.jpg`;
//     const dest = path.join(__dirname, '../uploads', newName);

//     // Validate URL
//     if (!/^https?:\/\/.+/.test(link)) {
//       throw new Error('Invalid URL format');
//     }

//     await imagedownloader.image({
//       url: link,
//       dest: dest,
//     });

//     res.json({ message: 'Image downloaded successfully', imageName: newName });
//   } catch (error) {
//     console.error('Error downloading image:', error); // Detailed logging
//     res.status(500).json({ message: 'Error downloading image', error });
//   }
// };

const addPlace = async (req, res) => {
  try {
    // const { token } = req.cookies; // Check if token is present
    // if (!token) {
    //   return res.status(401).json({ message: 'Authentication required' });
    // }

    const {
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      price,
      maxGuests,
      link
    } = req.body;

    // Validate required fields
    // if (!title || !address || !description || !perks || !checkIn || !checkOut || !maxGuests) {
    //   return res.status(400).json({ message: 'Missing required fields' });
    // }

    let imageUrls = []; // Store downloaded or uploaded image URLs

    const handleImageFromLink = async (link) => {
      try {
        const newName = `${Date.now()}.jpg`;
        const dest = path.join(__dirname, '../uploads', newName);
    
        // Download the image
        await imagedownloader.image({
          url: link,
          dest: dest,
        });
    
        console.log('Image downloaded successfully:', newName);
    
        // Upload to Cloudinary
        const cloudinaryUrl = await uploadOnCloudinary(dest);
    
        // Delete the file locally only after successful upload
        if (fs.existsSync(dest)) {
          fs.unlinkSync(dest); // Delete the local file
        }
    
        return cloudinaryUrl;
      } catch (error) {
        console.error('Error handling image from link:', error.message);
        throw new Error('Error handling image from link: ' + error.message);
      }
    };




    // Download image from link if provided
    if (link) {
      if (!/^https?:\/\/.+/.test(link)) {


        throw new Error('Invalid URL format');
      }

      const imageUrl = await handleImageFromLink(link); // Await the resolved URL
      if (imageUrl) {
        imageUrls.push(imageUrl); // Push the URL to imageUrls array
      }// Push the local image path to imageUrls array
    }

    // Handle image upload if a file is provided (assumes `req.file` comes from middleware like multer)
    if (req.file) {
      const imageUrl = await uploadOnCloudinary(req.file.path)
      imageUrls.push(imageUrl); // Add Cloudinary URL to image array
      fs.unlinkSync(req.file.path); // Remove file from local storage
    }


    // Create and save the new place
    const newPlace = new Place({
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      image: imageUrls, // Save the array of image URLs (local/cloudinary)
    });

    await newPlace.save();
    console.log('Place added successfully:', newPlace);

    res.status(201).json({ message: 'Place added successfully', place: newPlace });

  } catch (error) {
    console.log('Error adding place:', error.message || error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};












// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage }).single('image')

// const uploadPhoto = async (req, res) => {
//   try {
//     upload.single('image')(req, res, async (err) => {
//       if (err || !req.file) {
//         return res.status(400).json({ message: 'No file uploaded or error in file upload' });
//       }

//       // Upload the file buffer to Cloudinary
//       const uploadStream = cloudinary.uploader.upload_stream(
//         { folder: 'photoupload/images' }, // Adjust folder as needed
//         (error, result) => {
//           if (error) {
//             console.error('Error uploading to Cloudinary:', error);
//             return res.status(500).json({ message: 'Error uploading to Cloudinary' });
//           }

//           // Log and return the Cloudinary URL to the client
//           console.log('Uploaded file to Cloudinary:', result);

//           res.json({
//             message: 'File uploaded successfully',
//             fileUrl: result.secure_url // Cloudinary URL for the uploaded image
//           });
//         }
//       );

//       // Use the file buffer to upload
//       streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
//     });
//   } catch (error) {
//     console.error('Error in uploading process:', error);
//     res.status(500).json({ message: 'Error uploading file' });
//   }
// };



const onformSubmit = async (req, res) => {
  try {
    const {
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      price,
      maxGuests,
      photos 
    } = req.body;

    // Check for missing required fields
    if (!title || !address || !description || !perks || !checkIn || !checkOut || !maxGuests || !photos || !price) {
      return res.status(400).json({ message: "All fields are required, including photos" });
    }

    // Create new place entry
    const place = new Place({
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      image: photos 
    });

    await place.save();

    // Send a proper JSON response with both the message and place data
    res.status(200).json({
      message: "Place created successfully",
      place, // Include the place object in the response
    });

  } catch (error) {
    console.error('Error in form submission:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


const getallplace = async (req, res) => {
  try {
    // Fetch all places from the database
    const places = await Place.find(); // This will fetch all places, no need to use id

    // If no places are found, return an empty array
    if (!places || places.length === 0) {
      return res.status(404).json({ message: 'No places found' });
    }

    // Return the list of places
    return res.status(200).json(places);
  } catch (err) {
    // Handle any errors that occur
    console.error('Error fetching places:', err);
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

const deletePlace = async (req, res) => {
  try {
    // Extract place ID from the request parameters
    const placeId = req.params.id;

    // Find the place by ID and delete it
    const place = await Place.findByIdAndDelete(placeId); // Pass placeId directly

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







module.exports = {
  addPlace,
  deletePlace,
  // placeByLink,
  // uploadPhoto,
  onformSubmit,
  getallplace
}


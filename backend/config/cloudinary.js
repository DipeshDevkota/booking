require('dotenv').config(); // Ensure this line is at the top of your file

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_KEY_SECRET,
});
// console.log('Cloud Name:', process.env.CLOUD_NAME);
// console.log('API Key:', process.env.CLOUD_KEY);
// console.log('API Secret:', process.env.CLOUD_KEY_SECRET);

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        });

        console.log('File is uploaded on Cloudinary:', response.secure_url);
        return response.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error.message || error);
        fs.unlinkSync(localFilePath); // Clean up the local file
        return null; // Returning null when there's an error
    }
};

module.exports = { cloudinary, uploadOnCloudinary };

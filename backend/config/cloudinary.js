const cloudinary = require('cloudinary').v2;
const fs = require('fs');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
});

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null

        const response = await cloudinary.uploader.upload(
            localFilePath,{
                resource_type:"auto"
            })

            console.log('File is uploaded on cloudinary',
                response.url);
            return response;
    } catch (error) {

        fs.unlink(localFilePath)
        
    }
}
 
module.exports=cloudinary;
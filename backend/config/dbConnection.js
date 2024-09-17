require('dotenv').config(); // Ensure this line is at the top of your file


const mongoose = require('mongoose');

const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {

        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = databaseConnection;
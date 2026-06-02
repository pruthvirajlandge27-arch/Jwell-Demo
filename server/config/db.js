const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('WARNING: Server is running, but MongoDB connection failed. Please ensure your IP address is whitelisted on MongoDB Atlas.');
  }
};

module.exports = connectDB;

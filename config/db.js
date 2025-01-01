import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Asynchronously connects to the MongoDB database.
 * It uses the MONGODB_URI environment variable to establish the connection.
 * Logs a success message to the console in development environments.
 * Handles connection errors and throws an error.
 * @returns {Promise<void>} A Promise that resolves when the connection is successful or rejects with an error.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI from the .env file
    await mongoose.connect(process.env.MONGODB_URI);

    // Log a successful connection message if in development environment
    if (process.env.NODE_ENV === 'development') {
      console.log('MongoDB connected successfully');
    }
  } catch (error) {
    // Log the error to the console for debugging
    console.error('MongoDB connection error:', error);
    // Re-throw the error to be caught by the caller
    throw error;
  }
};

export default connectDB;
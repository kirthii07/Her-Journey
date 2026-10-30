const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables. Please check your .env configuration.');
  }

  // Avoid creating multiple connections
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }

  const sanitizedUri = uri.replace(/:\/\/.*@/, '://***:***@');

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });

    const dbName = conn.connection.name || 'herjourney_db';
    isConnected = true;

    console.log(`MongoDB connected successfully: ${dbName}`);
    return conn;
  } catch (err) {
    isConnected = false;
    const sanitizedError = err.message.replace(/mongodb:\/\/[^/]+/, 'mongodb://***');
    console.error(`MongoDB connection error: ${sanitizedError}`);
    throw new Error(`Database connection failed: ${sanitizedError}`);
  }
}

function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
  }
}

module.exports = {
  connectDB,
  isDbConnected,
  disconnectDB
};

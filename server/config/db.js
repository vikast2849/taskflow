/**
 * MongoDB Mongoose Connection Manager
 * Cognifyz Technologies Full Stack Development Internship - Level 3 Task 6
 */

const mongoose = require('mongoose');

let isConnected = false;
let memoryServer = null;

async function connectDB() {
  if (isConnected) return;

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskflow';
  
  try {
    // Attempt standard MongoDB connection with a 2-second timeout
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000
    });
    isConnected = true;
    console.log(`[TaskFlow DB] Connected to MongoDB at ${mongoUri}`);
  } catch (err) {
    console.warn(`[TaskFlow DB] Local MongoDB not detected (${err.message}).`);
    console.log(`[TaskFlow DB] Starting zero-config in-memory MongoDB instance for seamless instant review...`);
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const inMemoryUri = memoryServer.getUri();
      
      await mongoose.connect(inMemoryUri);
      isConnected = true;
      console.log(`[TaskFlow DB] Successfully connected to embedded MongoDB instance at ${inMemoryUri}`);
    } catch (memErr) {
      console.error(`[TaskFlow DB] Could not start embedded MongoDB:`, memErr);
      throw memErr;
    }
  }
}

async function disconnectDB() {
  if (isConnected) {
    await mongoose.disconnect();
    if (memoryServer) {
      await memoryServer.stop();
    }
    isConnected = false;
    console.log(`[TaskFlow DB] Disconnected from database.`);
  }
}

module.exports = { connectDB, disconnectDB };

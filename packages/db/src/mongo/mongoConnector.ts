import mongoose from "mongoose";

let isConnected = false;

/**
 * Connect to MongoDB using Mongoose.
 * @param uri MongoDB connection string
 */
export async function mongoConnector(uri: string) {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

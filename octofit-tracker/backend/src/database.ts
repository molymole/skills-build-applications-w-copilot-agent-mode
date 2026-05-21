import mongoose from "mongoose";

export const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db";

export async function connectToDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log(`Connected to MongoDB: ${MONGO_URI}`);
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

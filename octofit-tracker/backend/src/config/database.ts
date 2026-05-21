import mongoose from "mongoose";

export const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/octofit_db";

function getSafeMongoLogTarget(uri: string) {
  try {
    const normalizedUri = uri.startsWith("mongodb+srv://")
      ? uri.replace("mongodb+srv://", "https://")
      : uri.replace("mongodb://", "http://");
    const parsedUri = new URL(normalizedUri);
    const databaseName = parsedUri.pathname.replace(/^\//, "") || "octofit_db";

    return `${parsedUri.host}/${databaseName}`;
  } catch {
    return "configured MongoDB instance";
  }
}

export async function connectToDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log(`Connected to MongoDB: ${getSafeMongoLogTarget(MONGO_URI)}`);
}

export async function disconnectFromDatabase() {
  await mongoose.disconnect();
}

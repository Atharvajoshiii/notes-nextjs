import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URL environment variable in .env");
  console.log('erroor occured')
}

// Define the type for cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/* eslint-disable no-var */
declare global {
  var mongooseCache: MongooseCache | undefined; // Use var for global declaration
}
/* eslint-enable no-var */

// Use const for runtime initialization
const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

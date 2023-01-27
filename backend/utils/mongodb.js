import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Invalid MONGO_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { con: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    // console.info("Cached Connect");
    return cached.conn;
  }

  if (!cached.promise) {
    // console.info("Connecting...");
    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      retryWrites: true,
      writeConcern: {
        w: "majority",
      }
    }).then((c) => {
      // console.log("Connected");
      return c;
    })
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export const parseDoc = (doc) => JSON.parse(JSON.stringify(doc));

export default dbConnect;
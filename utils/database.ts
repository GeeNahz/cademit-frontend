import mongoose from "mongoose";
import type { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const options = <ConnectOptions>{
    dbName: "cademit",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, options);

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error(`${error}`);
  }
};
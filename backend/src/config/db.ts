import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "";
    const conn = mongoose.connect(MONGO_URI);
    console.log("Connection to MongoDB success");
  } catch (error) {
    console.log("Connection failed to MongoDB");
    process.exit(1);
  }
};

export default connectDB;

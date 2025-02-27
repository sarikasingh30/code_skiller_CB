import mongoose from "mongoose";
import dotEnv from "dotenv";
dotEnv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in MongoDB Connection : ", error);
  }
};

export default connectDB
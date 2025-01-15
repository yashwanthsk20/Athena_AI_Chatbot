import mongoose from "mongoose";
import env from "../env/variables.js";

const connectDB = async () => {
  try {
    let dbUrl = env.DB_URL;

    console.log(`Attempting to connect to MongoDB...`);
    await mongoose.connect(dbUrl);
    console.log(`Connected to MongoDB!`);
  } catch (error) {
    console.log(`Failed to connect to MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;

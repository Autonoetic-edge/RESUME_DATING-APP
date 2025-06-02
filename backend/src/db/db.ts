import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const mongourl = process.env.MONGO_URI!;

export const connectDB = async() => {
    try {
        await mongoose.connect(mongourl);
        console.log("database connected!");
        
    } catch (error) {
        console.log("error connecting to db: ", error);
        return;
    }
}
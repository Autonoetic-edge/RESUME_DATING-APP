import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

// Log the environment variables (without sensitive data)
console.log("Environment variables loaded:", {
    MONGO_URI: process.env.MONGO_URI ? "Set" : "Not set",
    NODE_ENV: process.env.NODE_ENV
});

const mongourl = process.env.MONGO_URI;

if (!mongourl) {
    console.error("MONGO_URI is not set in environment variables!");
    process.exit(1);
}

export const connectDB = async() => {
    try {
        await mongoose.connect(mongourl, {
            // These options are recommended for MongoDB Atlas
            retryWrites: true,
            w: 'majority'
        });
        console.log("Successfully connected to MongoDB Atlas!");
        
        // Log the current database name
        if (mongoose.connection.db) {
            console.log("Connected to database:", mongoose.connection.db.databaseName);
        }
        
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error);
        process.exit(1); // Exit with failure
    }
}
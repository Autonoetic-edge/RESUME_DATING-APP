import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import addDemoRoutes from "./routes/addDemo.route";
import pdfRoutes from "./routes/pdf.route";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', addDemoRoutes);
app.use('/api', pdfRoutes);

// Connect to MongoDB
connectDB().catch(console.error);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

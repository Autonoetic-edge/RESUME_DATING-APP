import express from "express";
import cors from "cors";
import { connectDB } from "./db/db";
import userRoutes from "./routes/addDemo.route"

const PORT = 8800;
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

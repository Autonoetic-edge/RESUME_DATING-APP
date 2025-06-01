import express from "express";
import cors from "cors";

const PORT = 8800;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

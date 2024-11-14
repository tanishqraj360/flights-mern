import express from "express";
import { connectDB } from "./db.js";
import router from "./router.js";
import cors from "cors";

const app = express();

const PORT = 8766;

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

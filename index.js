import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
})
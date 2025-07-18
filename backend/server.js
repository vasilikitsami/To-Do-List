import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import toDoRoutes from "./routes/toDoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import connectDB from "./config/mongo-db.js";
connectDB();

import cors from "cors";
const PORT = process.env.PORT || 4001;

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/api/todos", toDoRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

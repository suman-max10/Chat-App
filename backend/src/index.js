

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import messageRoutes from "./routes/message.route.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// app.options(/^(.*)$/, cors());

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});

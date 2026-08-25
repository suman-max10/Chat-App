import express from "express";  
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js"; 
import {connectDB} from "./lib/db.js";
import messageRoutes from "./routes/message.route.js";
dotenv.config();
const app = express();  

const PORT = process.env.PORT ;
app.use(express.json());
app.use(cookieParser());
app.use(
    cors(
    {
        origin:"http://localhost:5173",
    Credential:true,
    }
))

app.use("/api/auth",authRoute);
app.use("/api/message",messageRoutes);


app.listen(PORT, () => {    
    console.log("Server is running on port " + PORT);
    connectDB();
});
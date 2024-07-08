import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users"
import commentsRoutes from "./routes/comments"
import videoRoutes from "./routes/videos"
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = (): void => {
    mongoose.connect(process.env.MONGO || '').then(() => {
        console.log("Connected to DB");
    }).catch((err) => { throw err });
}

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comment",commentsRoutes);

app.listen(3000,()=>{
    connect();
    console.log("Server Started...");
})
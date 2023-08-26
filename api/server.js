import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import messagesRoute from "./routes/messages.route.js"
import gigRoute from "./routes/gig.route.js";
import cartRoute from "./routes/cart.route.js"
import orderRoute from "./routes/order.route.js"
import reviewRoute from "./routes/review.route.js"
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import uploadRoute from "./routes/uploads.route.js";
import {handleError} from "./errorhandler/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

dotenv.config();

mongoose.set('strictQuery', true);

const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = path.dirname(__filename); // Get the directory name of the current module

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        // console.log("mongo connection successful");
    } catch (error) {
        handleError(error);
    }
}

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Use import.meta.url instead of __dirname to get the directory name
app.use("/uploads", express.static(path.join(fileURLToPath(import.meta.url), "uploads")));
app.use("/api/auth", authRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/cart", cartRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/user", userRoute);
app.use("/api/uploads", uploadRoute);

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went wrong";

    return res.status(errStatus).send(errMessage);
});

app.listen(8800, () => {
    connect()
    // console.log("Backend connected")
})

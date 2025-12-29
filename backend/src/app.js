import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import allRoutes from "./routes/allRoutes.js";

dotenv.config();

// Create Express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
});
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173"
    })
);

// routes
app.use("/api", allRoutes);

export default app;

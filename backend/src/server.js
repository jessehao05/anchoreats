import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import allRoutes from "./routes/allRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

// start app, get port
const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(express.json()); // parse JSON bodies: req.body (for later) 
app.use((req, res, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
})
app.use(
    cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use("/api", allRoutes);


// connect database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server up");
    });
});


import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// Connect database and start server if successful
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server up");
    });
});


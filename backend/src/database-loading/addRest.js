import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function addRestaurants() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Restaurant.save({});

        console.log("Added restaurants");

    } catch (error) {
        console.log("Error connecting/adding restaurants:", error)
    } finally {
        await mongoose.connection.close();
        console.log("Connection closed");
    }
}

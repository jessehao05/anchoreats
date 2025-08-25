import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";
import initialData from "./initial-data.json" assert { type: "json" };
import dotenv from "dotenv";

dotenv.config();

// restaurants not included as of 08/10/2025: 
// - Banh Mi & Roll + (closed)
// - The Poki (closed)
// - Yaki House (closed)
// - Michaelangelo's Pizza (couldn't find website/questionable map presence)
// - Holy Smokes (meal swipes as of 24/25 year)

async function seedRestaurants() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // console.log(initialData);
        await Restaurant.deleteMany({});
        await Restaurant.insertMany(initialData, { validateBeforeSave: true });
        console.log("Inserted restaurants");

    } catch (error) {
        console.log("Error connecting/seeding restaurants:", error)
    } finally {
        await mongoose.connection.close();
        console.log("Connection closed");
    }
}


export const loadData = async () => {
    try {
        await Restaurant.insertMany(initialData);

            console.log("Restaurants successfully loaded!")
    } catch (error) {
        console.error("Error in loadData controller:", error);
        res.status(500).json({message: "Internal server error"})
    }
}

seedRestaurants();
import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();



async function addRestaurants() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const updates = { description: "this is a new description" };
        await Restaurant.findOneAndUpdate({ name: "test name" }, 
            updates,
            { new: true, runValidators: true}
        );
        console.log("Restaurant updated");

    } catch (error) {
        console.log("Error connecting/adding restaurants:", error)
    } finally {
        await mongoose.connection.close();
        console.log("Connection closed");
    }
}
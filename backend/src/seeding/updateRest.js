import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// !! change variabled imported based on which update
import { updateOne } from "../../../datalog/updates.js"

dotenv.config();

async function updateRestuarants() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // !! change variable based on import
        const updates = updateOne;

        for (const item of updates) {
            const existingRestaurant = await Restaurant.findOne({ name: item.name });
            const result = await Restaurant.findOneAndUpdate(
                { name: item.name },
                item.updates,
                { new: true, runValidators: true, upsert: true }
            );

            if (result) {
                const action = existingRestaurant ? 'updated' : 'added';
                console.log(`Restaurant ${item.name} ${action} successfully`);
            } else {
                console.log(`Restaurant ${item.name} failed`);
            }
        }

        console.log("All restaurants processed");

    } catch (error) {
        console.log("Error connecting/adding restaurants:", error)
    } finally {
        await mongoose.connection.close();
        console.log("Connection closed");
    }
}

updateRestuarants();
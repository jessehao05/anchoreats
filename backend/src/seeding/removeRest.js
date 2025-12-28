import Restaurant from "../models/Restaurant.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// !! change variabled imported based on which update
import { deleteOne } from "../../../datalog/updates.js"

dotenv.config();

async function removeRestaurants() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // !! change variable based on import
        const deletes = deleteOne;

        for (const name of deletes) {
            const result = await Restaurant.deleteOne({ name: name });

            if (result.deletedCount > 0) {
                console.log(`Restaurant ${name} deleted successfully`);
            } else {
                console.log(`Restaurant ${name} not found`);
            }
        }

        console.log("All deletions processed");

    } catch (error) {
        console.log("Error connecting/deleting restaurants:", error)
    } finally {
        await mongoose.connection.close();
        console.log("Connection closed");
    }
}

removeRestaurants();
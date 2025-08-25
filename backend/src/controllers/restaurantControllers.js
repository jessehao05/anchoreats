import Restaurant from "../models/Restaurant.js";

export const getRestaurantData = async (req, res) => {
    try {
        // get all restaurants
        let restaurants = await Restaurant.find({});
        res.status(200).json(restaurants);
    } catch (error) {
        console.error("Error in getRestaurantData controller:", error);
        res.status(500).json({message: "Internal server error"})
    }
}
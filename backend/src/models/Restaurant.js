import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        website: { type: String, required: true },
        location: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
        hours: {
            mon: [{ open: { type: String, required: true }, 
                close: { type: String, required: true } }],
            tue: [{ open: { type: String, required: true }, 
                close: { type: String, required: true } }],
            wed: [{ open: { type: String, required: true }, 
                close: { type: String, required: true } }],
            thu: [{ open: { type: String, required: true }, 
                close: { type: String, required: true } }],
            fri: [{ open: { type: String, required: true }, 
                close: { type: String, required: true } }],
            sat: [{ open: { type: String, required: true }, 
                close: { type: String, required: true } }],
            sun: [{ open: { type: String, required: true }, 
                close: { type: String, required: true } }],
        },
    },
    { timestamps: false }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
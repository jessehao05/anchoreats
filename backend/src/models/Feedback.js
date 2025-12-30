import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String },
    email: { type: String}
},
{
    timestamps: { createdAt: true, updatedAt: false }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
import Feedback from "../models/Feedback.js"

export const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Feedback successfully fetched!",
            feedback: feedback
        })
    } catch (error) {
        console.error("Error in getAllFeedback controller:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export const addFeedback = async (req, res) => {
    try {
        const { text, author, email } = req.body;

        const newFeedback = new Feedback({
            text,
            author,
            email
        })

        await newFeedback.save();
        
        res.status(201).json({
            success: true,
            message: "Feedback added successfully!",
            feedback: newFeedback
        });
    } catch (error) {
        console.error("Error in addFeedback controller:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}
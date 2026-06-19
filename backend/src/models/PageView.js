import mongoose from "mongoose";

const pageViewSchema = new mongoose.Schema({
    page: { type: String, required: true },
    referrer: { type: String },
    userAgent: { type: String },
    sessionId: { type: String },
}, {
    timestamps: { createdAt: true, updatedAt: false }
});

const PageView = mongoose.model("PageView", pageViewSchema);

export default PageView;

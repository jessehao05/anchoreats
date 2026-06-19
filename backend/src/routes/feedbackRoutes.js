import express from "express";
import { getAllFeedback, addFeedback } from "../controllers/feedbackControllers.js";

const router = express.Router();

router.get("/", getAllFeedback);
router.post("/", addFeedback);

export default router;

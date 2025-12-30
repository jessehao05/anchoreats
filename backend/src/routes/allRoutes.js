import express from "express";
import { getRestaurantData } from "../controllers/restaurantControllers.js";
import { getAllFeedback, addFeedback } from "../controllers/feedbackControllers.js";

const router = express.Router();

router.get("/data", getRestaurantData);
router.get("/feedback", getAllFeedback);
router.post("/feedback", addFeedback);


export default router;
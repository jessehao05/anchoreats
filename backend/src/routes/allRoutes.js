import express from "express";
import restaurantRoutes from "./restaurantRoutes.js";
import feedbackRoutes from "./feedbackRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";

const router = express.Router();

router.use("/data", restaurantRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/analytics", analyticsRoutes);

export default router;

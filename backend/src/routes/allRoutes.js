import express from "express";
import feedbackRoutes from "./feedbackRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";

const router = express.Router();

router.use("/feedback", feedbackRoutes);
router.use("/analytics", analyticsRoutes);

export default router;

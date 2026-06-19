import express from "express";
import rateLimit from "express-rate-limit";
import { logPageView, getAnalytics } from "../controllers/analyticsControllers.js";

const router = express.Router();

const analyticsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/", analyticsLimiter, logPageView);
router.get("/", getAnalytics);

export default router;

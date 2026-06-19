import express from "express";
import rateLimit from "express-rate-limit";
import { authenticate, logPageView, getAnalytics } from "../controllers/analyticsControllers.js";

const router = express.Router();

const pageViewLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/auth", authLimiter, authenticate);
router.post("/", pageViewLimiter, logPageView);
router.get("/", getAnalytics);

export default router;

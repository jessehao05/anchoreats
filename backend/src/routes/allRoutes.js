import express from "express";
import { getRestaurantData } from "../controllers/restaurantControllers.js";

const router = express.Router();

router.get("/data", getRestaurantData);


export default router;
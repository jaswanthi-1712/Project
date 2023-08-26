import express from "express";
import { getOrders, intent } from "../controllers/order.controllers.js";

const router = express.Router();

router.get("/:id", getOrders);
router.post("/create-payment-intent/:id", intent);

export default router;

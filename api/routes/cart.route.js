import express from "express";
import {getcarts,intent,deletecarts} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:id", getcarts);
router.delete("/:id", deletecarts);
router.post("/create-cart-intent/:id", intent);

export default router;

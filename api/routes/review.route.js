import express from "express";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controllers.js";

const router = express.Router();

router.post("/", createReview )
router.get("/:gigId", getReviews )
router.delete("/:id", deleteReview)

export default router;
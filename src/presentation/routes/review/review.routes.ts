import express from "express";
import { authenticateJWT } from "../../../infrastructure/http/auth.middleware";
import { ReviewController } from "../../controllers/review/review.controller";

const router = express.Router();

const reviewController = ReviewController.makeController();

router.post(
  "/create",
  authenticateJWT,
  reviewController.create.bind(reviewController)
);

router.put(
  "/update/:id",
  authenticateJWT,
  reviewController.update.bind(reviewController)
);

export default router;

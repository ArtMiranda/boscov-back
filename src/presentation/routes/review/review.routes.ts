import express from "express";
import { authenticateJWT } from "../../../infrastructure/http/auth.middleware";
import { ReviewController } from "../../controllers/review/review.controller";

const router = express.Router();

const reviewController = ReviewController.makeController();

router.post(
  "/",
  authenticateJWT,
  reviewController.create.bind(reviewController)
);

router.put(
  "/:id",
  authenticateJWT,
  reviewController.update.bind(reviewController)
);

router.get(
  "/movie/:movieId",
  authenticateJWT,
  reviewController.getReviewsByMovieId.bind(reviewController)
);

router.delete(
  "/:id",
  authenticateJWT,
  reviewController.deactivateById.bind(reviewController)
);

export default router;

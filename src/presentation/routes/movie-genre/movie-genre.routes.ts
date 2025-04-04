import express from "express";
import { authenticateJWT } from "../../../infrastructure/http/auth.middleware";
import { MovieGenreController } from "../../controllers/movie-genre/movie-genre.controller";

const router = express.Router();
const movieGenreController = MovieGenreController.makeController();

router.post(
  "/create",
  authenticateJWT,
  movieGenreController.create.bind(movieGenreController)
);

router.get(
  "/",
  authenticateJWT,
  movieGenreController.getAll.bind(movieGenreController)
);

router.delete(
  "/delete/:id",
  authenticateJWT,
  movieGenreController.deleteById.bind(movieGenreController)
);

router.put(
  "/update/:id",
  authenticateJWT,
  movieGenreController.update.bind(movieGenreController)
);

export default router;

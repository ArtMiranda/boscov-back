import express from "express";
import { authenticateJWT } from "../../../infrastructure/http/auth.middleware";
import { MovieController } from "../../controllers/movie/movie.controller";

const router = express.Router();
const movieController = MovieController.makeController();

router.get(
  "/now-playing",
  authenticateJWT,
  movieController.getNowPlayingMovies.bind(movieController)
);

router.get(
  "/popular",
  authenticateJWT,
  movieController.getPopularMovies.bind(movieController)
);

router.get(
  "/:movieId",
  authenticateJWT,
  movieController.getMovieDetailsById.bind(movieController)
);

router.get(
  "/search/name",
  authenticateJWT,
  movieController.searchMoviesByName.bind(movieController)
);

export default router;

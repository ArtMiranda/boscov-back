import { NextFunction, Request, Response } from "express";
import { GetMovieDetailsByIdUseCase } from "../../../application/useCases/movie/get-movie-details-by-id.usecase";
import { GetNowPlayingMoviesUseCase } from "../../../application/useCases/movie/get-now-playing-movies.usecase";

export class MovieController {
  constructor(
    private readonly getNowPlayingMoviesUseCase: GetNowPlayingMoviesUseCase,
    private readonly getMovieDetailsByIdUseCase: GetMovieDetailsByIdUseCase
  ) {}

  static makeController() {
    return new MovieController(
      GetNowPlayingMoviesUseCase.makeUseCase(),
      GetMovieDetailsByIdUseCase.makeUseCase()
    );
  }

  async getNowPlayingMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;

      if (page < 1) {
        res.status(400).json({
          message: "Page must be greater than 0",
          clientMessage: "A página deve ser maior que 0",
        });
        return;
      }

      const movies = await this.getNowPlayingMoviesUseCase.execute(page);

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  async getMovieDetailsById(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = Number(req.params.movieId);

      if (!movieId) {
        res.status(400).json({
          message: "Movie ID is required",
          clientMessage: "O ID do filme é obrigatório",
        });
        return;
      }

      const data = await this.getMovieDetailsByIdUseCase.execute(movieId);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

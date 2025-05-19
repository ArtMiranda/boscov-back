import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GetMovieDetailsByIdUseCase } from "../../../application/useCases/movie/get-movie-details-by-id.usecase";
import { GetNowPlayingMoviesUseCase } from "../../../application/useCases/movie/get-now-playing-movies.usecase";
import { GetPopularMoviesUseCase } from "../../../application/useCases/movie/get-popular-movies.usecase";
import { SearchMoviesByNameUseCase } from "../../../application/useCases/movie/search-movies-by-name.usecase";

export class MovieController {
  constructor(
    private readonly getNowPlayingMoviesUseCase: GetNowPlayingMoviesUseCase,
    private readonly getMovieDetailsByIdUseCase: GetMovieDetailsByIdUseCase,
    private readonly searchMoviesByNameUseCase: SearchMoviesByNameUseCase,
    private readonly getPopularMoviesUseCase: GetPopularMoviesUseCase
  ) {}

  static makeController() {
    return new MovieController(
      GetNowPlayingMoviesUseCase.makeUseCase(),
      GetMovieDetailsByIdUseCase.makeUseCase(),
      SearchMoviesByNameUseCase.makeUseCase(),
      GetPopularMoviesUseCase.makeUseCase()
    );
  }

  async getNowPlayingMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;

      if (page < 1) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Page must be greater than 0",
          clientMessage: "A página deve ser maior que 0",
        });
        return;
      }

      const movies = await this.getNowPlayingMoviesUseCase.execute(page);

      res.status(StatusCodes.OK).json(movies);
    } catch (error) {
      next(error);
    }
  }

  async getMovieDetailsById(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = Number(req.params.movieId);

      if (!movieId) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Movie ID is required",
          clientMessage: "O ID do filme é obrigatório",
        });
        return;
      }

      const data = await this.getMovieDetailsByIdUseCase.execute(movieId);
      res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  async searchMoviesByName(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.params.movieName;

      if (!query) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Movie name is required",
          clientMessage: "Nome do filme é obrigatório",
        });
        return;
      }

      const data = await this.searchMoviesByNameUseCase.execute(query);

      res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getPopularMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;

      if (page < 1) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Page must be greater than 0",
          clientMessage: "A página deve ser maior que 0",
        });
        return;
      }

      const data = await this.getPopularMoviesUseCase.execute(page);

      res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  }
}

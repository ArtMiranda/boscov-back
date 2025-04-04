import { NextFunction, Request, Response } from "express";
import { CreateMovieGenreUseCase } from "../../../application/useCases/movie-genre/create-movie-genre.usecase";
import { DeleteMovieGenreByIdUseCase } from "../../../application/useCases/movie-genre/delete-movie-genre-by-id.usecase";
import { GetAllMovieGenreUseCase } from "../../../application/useCases/movie-genre/get-all-movie-genre.usecase";
import { UpdateMovieGenreUseCase } from "../../../application/useCases/movie-genre/update-movie-genre.usecase";

export class MovieGenreController {
  private constructor(
    private readonly createMovieGenreUseCase: CreateMovieGenreUseCase,
    private readonly getAllMovieGenreUseCase: GetAllMovieGenreUseCase,
    private readonly deleteMovieGenreByIdUseCase: DeleteMovieGenreByIdUseCase,
    private readonly updateMovieGenreUseCase: UpdateMovieGenreUseCase
  ) {}
  public static makeController(): MovieGenreController {
    return new MovieGenreController(
      CreateMovieGenreUseCase.makeUseCase(),
      GetAllMovieGenreUseCase.makeUseCase(),
      DeleteMovieGenreByIdUseCase.makeUseCase(),
      UpdateMovieGenreUseCase.makeUseCase()
    );
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      if (!name) {
        res.status(400).json({
          message: "Name is required",
          clientMessage: "Nome é obrigatório",
        });
        return;
      }

      const newGenre = await this.createMovieGenreUseCase.execute(name);

      res.status(201).json({
        message: "Movie genre created successfully",
        clientMessage: "Gênero adicionado com sucesso",
        genre: newGenre,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const genres = await this.getAllMovieGenreUseCase.execute();

      res.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (!id) {
        res.status(400).json({
          message: "ID is required",
          clientMessage: "ID do gênero é obrigatório",
        });
        return;
      }

      const deletedGenre = await this.deleteMovieGenreByIdUseCase.execute(id);

      res.status(200).json({
        message: "Movie genre deleted successfully",
        clientMessage: "Gênero de filme excluído com sucesso",
        genre: deletedGenre,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const name = req.body.name;

      if (!id) {
        res.status(400).json({
          message: "ID is required",
          clientMessage: "ID do gênero é obrigatório",
        });
        return;
      }

      if (!name) {
        res.status(400).json({
          message: "Name is required",
          clientMessage: "Nome do gênero é obrigatório",
        });
        return;
      }

      res.send({
        message: "Movie genre updated successfully",
        clientMessage: "Gênero de filme atualizado com sucesso",
        genre: await this.updateMovieGenreUseCase.execute(id, name),
      });
    } catch (error) {
      next(error);
    }
  }
}

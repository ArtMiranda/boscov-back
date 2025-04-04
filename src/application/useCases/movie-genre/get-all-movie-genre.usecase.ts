import { MovieGenreRepository } from "../../../domain/repositories/movie-genre/movie-genre.repository";
import { IMovieGenreRepository } from "../../../infrastructure/repositories/movie-genre/movie-genre-repository.interface";

export class GetAllMovieGenreUseCase {
  private constructor(private movieGenreRepository: IMovieGenreRepository) {}

  static makeUseCase() {
    return new GetAllMovieGenreUseCase(MovieGenreRepository.getInstance());
  }

  async execute() {
    const genres = await this.movieGenreRepository.findAll();
    return genres;
  }
}

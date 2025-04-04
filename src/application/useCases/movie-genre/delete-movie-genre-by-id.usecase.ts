import { GenreNotFoundError } from "../../../domain/errors/movie-genre/movie-genre.errors";
import { MovieGenreRepository } from "../../../domain/repositories/movie-genre/movie-genre.repository";
import { IMovieGenreRepository } from "../../../infrastructure/repositories/movie-genre/movie-genre-repository.interface";

export class DeleteMovieGenreByIdUseCase {
  private constructor(private movieGenreRepository: IMovieGenreRepository) {}

  static makeUseCase() {
    return new DeleteMovieGenreByIdUseCase(MovieGenreRepository.getInstance());
  }

  async execute(id: number) {
    const genre = await this.movieGenreRepository.findById(id);
    if (!genre) {
      throw new GenreNotFoundError();
    }

    await this.movieGenreRepository.deleteById(id);
    return genre;
  }
}

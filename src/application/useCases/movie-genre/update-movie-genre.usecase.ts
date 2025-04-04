import { MovieGenreRepository } from "../../../domain/repositories/movie-genre/movie-genre.repository";
import { IMovieGenreRepository } from "../../../infrastructure/repositories/movie-genre/movie-genre-repository.interface";

export class UpdateMovieGenreUseCase {
  private constructor(
    private readonly movieGenreRepository: IMovieGenreRepository
  ) {}

  static makeUseCase() {
    return new UpdateMovieGenreUseCase(MovieGenreRepository.getInstance());
  }

  async execute(id: number, name: string) {
    return this.movieGenreRepository.updateById(id, name);
  }
}

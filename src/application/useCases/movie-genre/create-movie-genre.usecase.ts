import { movieGenre as MovieGenreEntity } from "@prisma/client";
import { GenreAlreadyExistsError } from "../../../domain/errors/movie-genre/movie-genre.errors";
import { MovieGenreRepository } from "../../../domain/repositories/movie-genre/movie-genre.repository";

export class CreateMovieGenreUseCase {
  private constructor(
    private readonly movieGenreRepository: MovieGenreRepository
  ) {}

  static makeUseCase(): CreateMovieGenreUseCase {
    return new CreateMovieGenreUseCase(MovieGenreRepository.getInstance());
  }

  async execute(name: string): Promise<MovieGenreEntity> {
    const existsByName = await this.movieGenreRepository.existsByName(name);
    if (existsByName) {
        throw new GenreAlreadyExistsError()
    }
    return await this.movieGenreRepository.createMovieGenre(name);
  }
}

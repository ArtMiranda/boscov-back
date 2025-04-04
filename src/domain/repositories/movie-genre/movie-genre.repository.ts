import { movieGenre as MovieGenreEntity, PrismaClient } from "@prisma/client";
import { IMovieGenreRepository } from "../../../infrastructure/repositories/movie-genre/movie-genre-repository.interface";
import { GenreNotFoundError } from "../../errors/movie-genre/movie-genre.errors";

const prisma = new PrismaClient();

export class MovieGenreRepository implements IMovieGenreRepository {
  private constructor() {}

  private static instance: MovieGenreRepository;

  static getInstance(): MovieGenreRepository {
    if (!MovieGenreRepository.instance) {
      MovieGenreRepository.instance = new MovieGenreRepository();
    }
    return MovieGenreRepository.instance;
  }

  async createMovieGenre(name: string): Promise<MovieGenreEntity> {
    return await prisma.movieGenre.create({
      data: {
        name: name,
      },
    });
  }

  async findById(id: number): Promise<MovieGenreEntity | null> {
    return await prisma.movieGenre.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByName(name: string): Promise<MovieGenreEntity | null> {
    return await prisma.movieGenre.findUnique({
      where: {
        name: name,
      },
    });
  }

  async existsByName(name: string): Promise<boolean> {
    const genre = await this.findByName(name);
    return genre !== null;
  }

  async findAll(): Promise<MovieGenreEntity[]> {
    return await prisma.movieGenre.findMany();
  }

  async deleteById(id: number): Promise<void> {
    await prisma.movieGenre.delete({
      where: {
        id: id,
      },
    });
  }

  async updateById(id: number, name: string): Promise<MovieGenreEntity> {
    const genre = await this.findById(id);

    if (!genre) {
      throw new GenreNotFoundError();
    }

    return await prisma.movieGenre.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
  }
}

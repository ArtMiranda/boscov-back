import { movieGenre as PrismaEntity } from "@prisma/client";

export interface IMovieGenreRepository {
  createMovieGenre(name: string): Promise<PrismaEntity>;
  existsByName(name: string): Promise<boolean>;
  findById(id: number): Promise<PrismaEntity | null>;
  findByName(name: string): Promise<PrismaEntity | null>;
  findAll(): Promise<PrismaEntity[]>;
  deleteById(id: number): Promise<void>;
  updateById(id: number, name: string): Promise<PrismaEntity>;
}

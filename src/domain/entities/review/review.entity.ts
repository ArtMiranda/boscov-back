import { User } from "../user/user.entity";

export class Review {
  id: string;
  movieId: number;
  title: string;
  body: string;
  rating: number;
  active: boolean;
  author: User;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    movieId: number,
    title: string,
    body: string,
    rating: number,
    active: boolean,
    author: User,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.movieId = movieId;
    this.title = title;
    this.body = body;
    this.rating = rating;
    this.active = active;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

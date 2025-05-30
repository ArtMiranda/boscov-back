import { Review } from "../../../../domain/entities/review/review.entity";
import { User } from "../../../../domain/entities/user/user.entity";

export class ReviewOutputDTO {
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

  static toResponse(review: Review): ReviewOutputDTO {
    return new ReviewOutputDTO(
      review.id,
      review.movieId,
      review.title,
      review.body,
      review.rating,
      review.active,
      review.author,
      review.createdAt,
      review.updatedAt
    );
  }
}

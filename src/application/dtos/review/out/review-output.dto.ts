import { Review } from "../../../../domain/entities/review/review.entity";

export class ReviewOutputDTO {
  id: string;
  movieId: string;
  title: string;
  body: string;
  rating: number;
  active: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    movieId: string,
    title: string,
    body: string,
    rating: number,
    active: boolean,
    authorId: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.movieId = movieId;
    this.title = title;
    this.body = body;
    this.rating = rating;
    this.active = active;
    this.authorId = authorId;
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
      review.authorId,
      review.createdAt,
      review.updatedAt
    );
  }
}

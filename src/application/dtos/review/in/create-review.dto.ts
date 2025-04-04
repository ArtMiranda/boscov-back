import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
    Max,
    Min,
} from "class-validator";

export class CreateReviewDTO {
  @IsUUID()
  @IsNotEmpty()
  movieId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating: number;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  constructor(
    movieId: string,
    title: string,
    body: string,
    rating: number,
    authorId: string
  ) {
    this.movieId = movieId;
    this.title = title;
    this.body = body;
    this.rating = rating;
    this.authorId = authorId;
  }
}

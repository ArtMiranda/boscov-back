import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min
} from "class-validator";

export class UpdateReviewDTO {
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

  constructor(title: string, body: string, rating: number) {
    this.title = title;
    this.body = body;
    this.rating = rating;
  }
}

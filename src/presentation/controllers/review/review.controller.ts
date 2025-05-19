import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateReviewDTO } from "../../../application/dtos/review/in/create-review.dto";
import { UpdateReviewDTO } from "../../../application/dtos/review/in/update-review.dto";
import { ReviewOutputDTO } from "../../../application/dtos/review/out/review-output.dto";
import { CreateReviewUseCase } from "../../../application/useCases/review/create-review.usecase";
import { DeactivateReviewUseCase } from "../../../application/useCases/review/deactivate-review.usecase";
import { GetReviewsByMovieIdUseCase } from "../../../application/useCases/review/get-reviews-by-movie-id.usecase";
import { UpdateReviewUseCase } from "../../../application/useCases/review/update-review.usecase";

export class ReviewController {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCase,
    private readonly updateReviewUseCase: UpdateReviewUseCase,
    private readonly deactivateReviewUseCase: DeactivateReviewUseCase,
    private readonly getReviewsByMovieIdUseCase: GetReviewsByMovieIdUseCase
  ) {}

  static makeController() {
    return new ReviewController(
      CreateReviewUseCase.makeUseCase(),
      UpdateReviewUseCase.makeUseCase(),
      DeactivateReviewUseCase.makeUseCase(),
      GetReviewsByMovieIdUseCase.makeUseCase()
    );
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(CreateReviewDTO, req.body as CreateReviewDTO);

      const errors = await validate(dto);
      if (errors.length > 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Validation failed",
          errors: errors,
        });
        return;
      }

      const newReview = await this.createReviewUseCase.execute(dto);

      res.status(StatusCodes.CREATED).json({
        message: "Review created successfully",
        clientMessage: "Avaliação criada com sucesso",
        data: ReviewOutputDTO.toResponse(newReview),
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(UpdateReviewDTO, req.body as UpdateReviewDTO);
      const reviewId = req.params.id;

      if (!reviewId) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Review ID is required",
          clientMessage: "ID da avaliação é obrigatório",
        });
        return;
      }

      const errors = await validate(dto);
      if (errors.length > 0) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Validation failed",
          errors: errors,
        });
        return;
      }

      const updatedReview = await this.updateReviewUseCase.execute(
        reviewId,
        dto
      );

      res.status(StatusCodes.OK).json({
        message: "Review updated successfully",
        clientMessage: "Avaliação atualizada com sucesso",
        data: ReviewOutputDTO.toResponse(updatedReview),
      });
    } catch (error) {
      next(error);
    }
  }

  async deactivateById(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewId = req.params.id;
      if (!reviewId) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Review ID is required",
          clientMessage: "ID da avaliação é obrigatório",
        });
        return;
      }
      const review = await this.deactivateReviewUseCase.execute(reviewId);
      res.status(StatusCodes.OK).json({
        message: "Review deactivated successfully",
        clientMessage: "Avaliação desativada com sucesso",
        data: ReviewOutputDTO.toResponse(review),
      });
    } catch (error) {
      next(error);
    }
  }

  async getReviewsByMovieId(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = req.params.movieId;
      if (!movieId) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Movie ID is required",
          clientMessage: "ID do filme é obrigatório",
        });
        return;
      }
      const reviews = await this.getReviewsByMovieIdUseCase.execute(movieId);
      res
        .status(StatusCodes.OK)
        .json(reviews.map((review) => ReviewOutputDTO.toResponse(review)));
    } catch (error) {
      next(error);
    }
  }
}

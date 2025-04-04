import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CreateReviewDTO } from "../../../application/dtos/review/in/create-review.dto";
import { UpdateReviewDTO } from "../../../application/dtos/review/in/update-review.dto";
import { ReviewOutputDTO } from "../../../application/dtos/review/out/review-output.dto";
import { CreateReviewUseCase } from "../../../application/useCases/review/create-review.usecase";
import { UpdateReviewUseCase } from "../../../application/useCases/review/update-review.usecase";

export class ReviewController {
  constructor(
    private readonly createReviewUseCase: CreateReviewUseCase,
    private readonly updateReviewUseCase: UpdateReviewUseCase
  ) {}

  static makeController() {
    return new ReviewController(
      CreateReviewUseCase.makeUseCase(),
      UpdateReviewUseCase.makeUseCase()
    );
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const dto = plainToInstance(CreateReviewDTO, req.body as CreateReviewDTO);

    const errors = await validate(dto);
    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors,
      });
      return;
    }

    const newReview = await this.createReviewUseCase.execute(dto);

    res.status(201).json({
      message: "Review created successfully",
      clientMessage: "Avaliação criada com sucesso",
      data: ReviewOutputDTO.toResponse(newReview),
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const dto = plainToInstance(UpdateReviewDTO, req.body as UpdateReviewDTO);
    const reviewId = req.params.id;

    if (!reviewId) {
      res.status(400).json({
        message: "Review ID is required",
        clientMessage: "ID da avaliação é obrigatório",
      });
      return;
    }

    const errors = await validate(dto);
    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors,
      });
      return;
    }

    const updatedReview = await this.updateReviewUseCase.execute(reviewId, dto);

    res.status(200).json({
      message: "Review updated successfully",
      clientMessage: "Avaliação atualizada com sucesso",
      data: ReviewOutputDTO.toResponse(updatedReview),
    });
  }
}

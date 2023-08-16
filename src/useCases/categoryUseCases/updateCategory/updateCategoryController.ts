import { Request, Response } from "express";
import { UpdateCategoryUseCase } from "./updateCategory.useCase";
import { UpdateCategoryDTO } from "./updateCategory.dto";
import { validate } from "class-validator";

export class UpdateCategoryController {
  constructor (
    private updateCategoryUseCase: UpdateCategoryUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const updateCategoryDto: UpdateCategoryDTO = request.body;

    try {
      validate(updateCategoryDto)
      await this.updateCategoryUseCase.execute(updateCategoryDto, +id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}
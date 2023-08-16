import { Request, Response } from "express";
import { UpdateCategoryUseCase } from "./updateCategory.useCase";

export class UpdateCategoryController {
  constructor (
    private updateCategoryUseCase: UpdateCategoryUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    try {
      await this.updateCategoryUseCase.execute(name, +id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}
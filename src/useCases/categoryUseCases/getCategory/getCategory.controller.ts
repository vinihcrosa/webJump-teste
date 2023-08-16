import { Request, Response } from "express";
import { GetCategoryUseCase } from "./getCategory.useCase";

export class GetCategoryController {
  constructor(
    private getCategoryUseCase: GetCategoryUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { name } = req.params;

    try {
      const category = await this.getCategoryUseCase.execute(name);

      return res.status(200).json(category);
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
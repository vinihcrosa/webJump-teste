import { Request, Response } from "express";
import { GetAllCategoriesUseCase } from "./getAllCategories.useCase";

export class GetAllCategoriesController {
  constructor (private getAllCategoriesUseCase: GetAllCategoriesUseCase) {}

  async handle (req: Request, res: Response) {
    const { limit = 10 } = req.query
    try {
      const categories = await this.getAllCategoriesUseCase.execute(+limit)

      return res.status(200).json(categories)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}
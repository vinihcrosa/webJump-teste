import { Request, Response } from "express";
import { GetAllCategoriesUseCase } from "./getAllCategories.useCase";
import { ILogger } from "../../../Logger/ILogger";

export class GetAllCategoriesController {
  constructor (
    private getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private logger: ILogger
  ) {}

  async handle (req: Request, res: Response) {
    this.logger.debug(
      'getAllCategoriesController',
      'Starting to get all categories.',
      {}
    )

    const { limit = 10 } = req.query
    try {
      const categories = await this.getAllCategoriesUseCase.execute(+limit)

      this.logger.info(
        'getAllCategoriesController',
        'Categories successfully obtained.',
        { categories }
      )

      return res.status(200).json(categories)
    } catch (error) {
      this.logger.error(
        'getAllCategoriesController',
        `error to get all categories.`,
        { error }
      )

      return res.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}
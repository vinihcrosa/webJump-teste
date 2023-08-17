import { Request, Response } from "express";
import { GetCategoryUseCase } from "./getCategory.useCase";
import { ILogger } from "../../../Logger/ILogger";
import { getCategoryController } from ".";

export class GetCategoryController {
  constructor(
    private getCategoryUseCase: GetCategoryUseCase,
    private logger: ILogger
  ) {}

  async handle(req: Request, res: Response) {
    this.logger.debug(
      'getCategoryController',
      `Get category by name: ${req.params.name}`,
      { name: req.params.name }	
    )

    const { name } = req.params;

    try {
      const category = await this.getCategoryUseCase.execute(name);

      return res.status(200).json(category);
    } catch (err) {
      this.logger.error(
        'getCategoryController',
        `Error while trying to get category by name: ${err.message}`,
        {error: err}
      )

      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}
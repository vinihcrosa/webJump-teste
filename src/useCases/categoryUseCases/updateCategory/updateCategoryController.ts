import { Request, Response } from "express";
import { UpdateCategoryUseCase } from "./updateCategory.useCase";
import { UpdateCategoryDTO } from "./updateCategory.dto";
import { validate } from "class-validator";
import { ILogger } from "../../../Logger/ILogger";

export class UpdateCategoryController {
  constructor (
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private logger: ILogger
  ) {}

  async handle(request: Request, response: Response) {
    this.logger.debug(
      'updateCategoryController',
      `update category with id ${request.params.id}`,
      {
        data: request.body
      }
    )

    const { id } = request.params;
    const updateCategoryDto: UpdateCategoryDTO = request.body;

    try {
      validate(updateCategoryDto)
      await this.updateCategoryUseCase.execute(updateCategoryDto, +id);

      this.logger.info(
        'updateCategoryController',
        `category with id ${id} updated successfully`,
        {}
      )

      return response.status(204).send();
    } catch (error) {
      this.logger.error(
        'updateCategoryController',
        `error on update category with id ${id}`,
        {error}
      )
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}
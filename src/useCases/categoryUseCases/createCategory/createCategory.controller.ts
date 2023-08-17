import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./createCategory.useCase";
import { CreateCategoryDTO } from "./createCategory.dto";
import { validate } from "class-validator";
import { ILogger } from "../../../Logger/ILogger";

export class CreateCategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private logger: ILogger
  ) {}

  async handle(request: Request, response: Response) {
    this.logger.debug(
      'createCategoryController',
      `Creating category ${JSON.stringify(request.body)}`,
      {
        data: request.body
      }
    )

    const createCategoryDto: CreateCategoryDTO = request.body;

    try {
      validate(createCategoryDto);
      await this.createCategoryUseCase.execute(createCategoryDto);
  
      this.logger.info(
        'createCategoryController',
        `Category ${createCategoryDto.name} created successfully`,
        {}
      )

      return response.status(201).send();
    } catch (error) {
      this.logger.error(
        'createCategoryController',
        `Error creating category ${createCategoryDto.name}`,
        {error}
      )

      let message = 'Unexpected error.'
      if(error instanceof Error)
        message = error.message
      
      return response.status(400).send({
        message
      })
    }

  }
}
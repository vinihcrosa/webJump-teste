import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./createCategory.useCase";
import { CreateCategoryDTO } from "./createCategory.dto";
import { validate } from "class-validator";

export class CreateCategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const createCategoryDto: CreateCategoryDTO = request.body;

    try {
      validate(createCategoryDto);
      await this.createCategoryUseCase.execute(createCategoryDto);
  
      return response.status(201).send();
    } catch (error) {
      let message = 'Unexpected error.'
      if(error instanceof Error)
        message = error.message
      
      return response.status(400).send({
        message
      })
    }

  }
}
import { Request, Response } from "express";
import { CreateProductUseCase } from "./createProduct.useCase.ts";
import { CreateProductRequestDTO } from "./createProduct.dto.js";
import { validate } from 'class-validator'

export class CreateProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
  ) {}

  async handle(request: Request, response: Response) {
    const createProductDTO: CreateProductRequestDTO = request.body;

    try {
      validate(createProductDTO);
      await this.createProductUseCase.execute(createProductDTO);
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
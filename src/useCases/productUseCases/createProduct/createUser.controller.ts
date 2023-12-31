import { Request, Response } from "express";
import { CreateProductUseCase } from "./createProduct.useCase.ts";
import { CreateProductRequestDTO } from "./createProduct.dto.js";
import { validate } from 'class-validator'
import { ILogger } from "../../../Logger/ILogger.js";

export class CreateProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private logger: ILogger
  ) {}

  async handle(request: Request, response: Response) {
    const createProductDTO: CreateProductRequestDTO = request.body;

    this.logger.info(
      'createUserController', 
      `Creating product ${createProductDTO.name}`,
      {
        createProductDTO,
        file: request.file
      },
    )

    createProductDTO.image = request.file?.filename

    try {
      validate(createProductDTO);
      await this.createProductUseCase.execute(createProductDTO);
      this.logger.debug(
        'createUserController',
        `Product ${createProductDTO.name} created successfully`, {})
      return response.status(201).send();
    } catch (error) {
      this.logger.error(
        'createUserController',
        `Error creating product ${createProductDTO.name}`, 
        {
          error
        }
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
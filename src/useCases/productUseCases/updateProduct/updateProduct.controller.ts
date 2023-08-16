import { Request, Response } from "express";
import { UpdateProductUseCase } from "./updateProduct.useCase";
import { validate } from "class-validator";

export class UpdateProductController {
  constructor (
    private updateProductUseCase: UpdateProductUseCase
  ) {}

  async handle (request: Request, response: Response): Promise<any> {
    const updateProductDTO = request.body;

    const { sku } = request.params;

    try {
      validate(updateProductDTO)

      await this.updateProductUseCase.execute(sku, updateProductDTO);

      return response.status(200).send();
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
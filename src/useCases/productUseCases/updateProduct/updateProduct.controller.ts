import { Request, Response } from "express";
import { UpdateProductUseCase } from "./updateProduct.useCase";
import { validate } from "class-validator";
import { ILogger } from "../../../Logger/ILogger";

export class UpdateProductController {
  constructor (
    private updateProductUseCase: UpdateProductUseCase,
    private logger: ILogger
  ) {}

  async handle (request: Request, response: Response): Promise<any> {
    this.logger.debug(
      'updateProductController',
      `update product request: ${JSON.stringify(request.body)}`,
      {
        body: request.body,
      }
    )
    const updateProductDTO = request.body;

    const { sku } = request.params;

    try {
      validate(updateProductDTO)

      await this.updateProductUseCase.execute(sku, updateProductDTO);

      this.logger.info(
        'updateProductController',
        `product updated: ${JSON.stringify(updateProductDTO)}`,
        {}
      )

      return response.status(200).send();
    } catch (error) {
      this.logger.error(
        'updateProductController',
        `error when updating product: ${JSON.stringify(error)}`,
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
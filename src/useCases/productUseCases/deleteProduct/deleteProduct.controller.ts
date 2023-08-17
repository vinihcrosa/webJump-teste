import { Request, Response } from "express";
import { DeletyeProductUseCase } from "./deleteProduct.useCase";
import { ILogger } from "../../../Logger/ILogger";

export class DeleteProductController {
  constructor (
    private deleteProductUseCase: DeletyeProductUseCase,
    private logger: ILogger  
  ) {}

  async handle (request: Request, response: Response) {
    this.logger.debug(
      'deleteProductController',
      `delete product sku: ${request.params.sku}`,
      {
        params: request.params
      }
    )
    const { sku } = request.params

    try {
      await this.deleteProductUseCase.execute(sku)

      this.logger.info(
        'deleteProductController',
        `delete product sku: ${request.params.sku}`,
        {}
      )

      return response.status(200).send()
    } catch (error) {
      this.logger.error(
        'deleteProductController',
        `delete product sku: ${request.params.sku} fail`,
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
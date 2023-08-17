import { Request, Response } from "express";
import { DeletyeProductUseCase } from "../deleteProduct/deleteProduct.useCase";
import { GetOneProductUseCase } from "./getOneProduct.useCase";
import { ILogger } from "../../../Logger/ILogger";

export class GetOneProductController {
  constructor (
    private getOneProductUseCase: GetOneProductUseCase,
    private logger: ILogger
  ) {}

  async handle (request: Request, response: Response) {
    this.logger.debug(
      'getOneProductController',
      `Geting one product with sku: ${request.params.sku}`,
      {
        params: request.params
      }
    )
    const { sku } = request.params

    try {
      const product = await this.getOneProductUseCase.execute(sku)

      this.logger.info(
        'getOneProductController',
        `Product with sku: ${sku} found successfully`,
        {product}
      )

      return response.status(200).send(product)
    } catch (error) {
      this.logger.error(
        'getOneProductController',
        `Error on geting one product with sku: ${sku}`,
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
import { Request, Response } from "express";
import { DeletyeProductUseCase } from "../deleteProduct/deleteProduct.useCase";
import { GetOneProductUseCase } from "./getOneProduct.useCase";

export class GetOneProductController {
  constructor (
    private getOneProductUseCase: GetOneProductUseCase
  ) {}

  async handle (request: Request, response: Response) {
    const { sku } = request.params

    try {
      const product = await this.getOneProductUseCase.execute(sku)

      return response.status(200).send(product)
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
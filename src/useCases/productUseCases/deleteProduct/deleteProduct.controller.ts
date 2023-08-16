import { Request, Response } from "express";
import { DeletyeProductUseCase } from "./deleteProduct.useCase";

export class DeleteProductController {
  constructor (private deleteProductUseCase: DeletyeProductUseCase) {}

  async handle (request: Request, response: Response) {
    const { sku } = request.params

    try {
      await this.deleteProductUseCase.execute(sku)

      response.status(200).send()
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
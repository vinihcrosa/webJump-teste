import { Request, Response, Router } from "express";
import { createProductController } from "./createProduct";
import { getAllProductsController } from "./getAllProducts";
import { updateProductController } from "./updateProduct";

const productRouter = Router()

productRouter.post('/', (req: Request, res: Response) => {
  createProductController.handle(req, res)
})

productRouter.get('/', (req: Request, res: Response) => {
  getAllProductsController.handle(req, res)
})

productRouter.patch('/:sku', (req: Request, res: Response) => {
  updateProductController.handle(req, res)
})

export { productRouter }
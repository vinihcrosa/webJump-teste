import { Request, Response, Router } from "express";
import { createProductController } from "./createProduct";
import { getAllProductsController } from "./getAllProducts";

const productRouter = Router()

productRouter.post('/', (req: Request, res: Response) => {
  createProductController.handle(req, res)
})

productRouter.get('/', (req: Request, res: Response) => {
  getAllProductsController.handle(req, res)
})

export { productRouter }
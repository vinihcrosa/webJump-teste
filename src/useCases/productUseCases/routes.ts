import { Request, Response, Router } from "express";
import { createProductController } from "./createProduct";

const productRouter = Router()

productRouter.post('/', (req: Request, res: Response) => {
  createProductController.handle(req, res)
})

export { productRouter }
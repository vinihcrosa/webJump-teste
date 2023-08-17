import { Request, Response, Router } from "express";
import { createProductController } from "./createProduct";
import { getAllProductsController } from "./getAllProducts";
import { updateProductController } from "./updateProduct";
import { deleteProductController } from "./deleteProduct";
import { getOneProductController } from "./getOneProduct";
import { upload } from "../../multerConfig";

const productRouter = Router()

productRouter.post('/', upload.single('image'), (req: Request, res: Response) => {
  createProductController.handle(req, res)
})

productRouter.get('/', (req: Request, res: Response) => {
  getAllProductsController.handle(req, res)
})

productRouter.get('/:sku', (req: Request, res: Response) => {
  getOneProductController.handle(req, res)
})

productRouter.patch('/:sku', (req: Request, res: Response) => {
  updateProductController.handle(req, res)
})

productRouter.delete('/:sku', (req: Request, res: Response) => {
  deleteProductController.handle(req, res)
})

export { productRouter }
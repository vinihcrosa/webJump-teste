import { Request, Response, Router } from "express";
import { createCategoryController } from "./createCategory";
import { getAllCategoriesController } from "./getAllCategories";

const categoryRouter = Router()

categoryRouter.post('/', (req: Request, res: Response) => {
  createCategoryController.handle(req, res)
})

categoryRouter.get('/', (req: Request, res: Response) => {
  getAllCategoriesController.handle(req, res)
})

export { categoryRouter }
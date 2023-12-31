import { Request, Response, Router } from "express";
import { createCategoryController } from "./createCategory";
import { getAllCategoriesController } from "./getAllCategories";
import { getCategoryController } from "./getCategory";
import { updateCategoryController } from "./updateCategory";

const categoryRouter = Router()

categoryRouter.post('/', (req: Request, res: Response) => {
  createCategoryController.handle(req, res)
})

categoryRouter.get('/', (req: Request, res: Response) => {
  getAllCategoriesController.handle(req, res)
})

categoryRouter.get('/:name', (req: Request, res: Response) => {
  getCategoryController.handle(req, res)
})

categoryRouter.patch('/:id', (req: Request, res: Response) => {
  updateCategoryController.handle(req, res)
})

export { categoryRouter }
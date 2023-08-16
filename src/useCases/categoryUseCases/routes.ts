import { Request, Response, Router } from "express";
import { createCategoryController } from "./createCategory";

const categoryRouter = Router()

categoryRouter.post('/', (req: Request, res: Response) => {
  createCategoryController.handle(req, res)
})

export { categoryRouter }
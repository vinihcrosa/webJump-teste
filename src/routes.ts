import { Router } from "express";
import { productRouter } from "./useCases/productUseCases/routes";
import { categoryRouter } from "./useCases/categoryUseCases/routes";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
})

router.use('/product', productRouter)

router.use('/category', categoryRouter)

export { router } 
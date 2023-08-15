import { Router } from "express";
import { productRouter } from "./useCases/productUseCases/routes";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
})

router.use('/product', productRouter)

export { router } 
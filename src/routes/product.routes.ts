import { Router } from "express";
import { ProductController } from "../controller/ProductController";

const productRoutes = Router();
const controller = new ProductController();

productRoutes.get("/", controller.index);
productRoutes.get("/:id", controller.show);
productRoutes.post("/", controller.store);
productRoutes.put("/:id", controller.update);
productRoutes.delete("/:id", controller.destroy);

export { productRoutes };

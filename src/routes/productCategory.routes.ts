import { Router } from "express";
import { ProductCategoryController } from "../controller/ProductCategoryController";

const productCategoryRoutes = Router();
const controller = new ProductCategoryController();

productCategoryRoutes.get("/", controller.index);
productCategoryRoutes.get("/:id", controller.show);
productCategoryRoutes.post("/", controller.store);
productCategoryRoutes.put("/:id", controller.update);
productCategoryRoutes.delete("/:id", controller.destroy);

export default productCategoryRoutes;

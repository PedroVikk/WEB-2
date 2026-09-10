import { Router } from "express";
import { ProductSituationController } from "../controller/ProductSituationController";

const productSituationRoutes = Router();
const controller = new ProductSituationController();

productSituationRoutes.get("/", controller.index);
productSituationRoutes.get("/:id", controller.show);
productSituationRoutes.post("/", controller.store);
productSituationRoutes.put("/:id", controller.update);
productSituationRoutes.delete("/:id", controller.destroy);

export default productSituationRoutes;

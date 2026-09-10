import { Router } from "express";
import situationRoutes from "./situation.routes";
import userRoutes from "./user.routes";
import productCategoryRoutes from "./productCategory.routes";
import productSituationRoutes from "./productSituation.routes";
import productRoutes from "./product.routes";

const routes = Router();

routes.use("/situations", situationRoutes);
routes.use("/users", userRoutes);
routes.use("/product-categories", productCategoryRoutes);
routes.use("/product-situations", productSituationRoutes);
routes.use("/products", productRoutes);

export default routes;

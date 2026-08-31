import { Router } from "express";
import { crudRouter } from "./crudRouter";
import { SituationController } from "../controllers/SituationController";
import { UserController } from "../controllers/UserController";
import { ProductCategoryController } from "../controllers/ProductCategoryController";
import { ProductSituationController } from "../controllers/ProductSituationController";
import { ProductController } from "../controllers/ProductController";

const routes = Router();

routes.use("/situations", crudRouter(new SituationController()));
routes.use("/users", crudRouter(new UserController()));
routes.use("/product-categories", crudRouter(new ProductCategoryController()));
routes.use("/product-situations", crudRouter(new ProductSituationController()));
routes.use("/products", crudRouter(new ProductController()));

export { routes };

import { Router } from "express";
import { crudRouter } from "./crudRouter";
import { SituationController } from "../controller/SituationController";
import { UserController } from "../controller/UserController";
import { ProductCategoryController } from "../controller/ProductCategoryController";
import { ProductSituationController } from "../controller/ProductSituationController";
import { ProductController } from "../controller/ProductController";

const routes = Router();

routes.use("/situations", crudRouter(new SituationController()));
routes.use("/users", crudRouter(new UserController()));
routes.use("/product-categories", crudRouter(new ProductCategoryController()));
routes.use("/product-situations", crudRouter(new ProductSituationController()));
routes.use("/products", crudRouter(new ProductController()));

export { routes };

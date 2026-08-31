import { Router } from "express";
import { ObjectLiteral } from "typeorm";
import { BaseController } from "../controller/BaseController";

/**
 * Monta as 5 rotas padrão de CRUD para um controller.
 *   GET    /        -> index  (lista paginada)
 *   GET    /:id     -> show
 *   POST   /        -> store
 *   PUT    /:id     -> update
 *   DELETE /:id     -> destroy
 */
export function crudRouter<T extends ObjectLiteral & { id: number }>(
  controller: BaseController<T>
): Router {
  const router = Router();

  router.get("/", controller.index);
  router.get("/:id", controller.show);
  router.post("/", controller.store);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.destroy);

  return router;
}

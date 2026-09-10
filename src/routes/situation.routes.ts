import { Router } from "express";
import { SituationController } from "../controller/SituationController";

const situationRoutes = Router();
const controller = new SituationController();

situationRoutes.get("/", controller.index);
situationRoutes.get("/:id", controller.show);
situationRoutes.post("/", controller.store);
situationRoutes.put("/:id", controller.update);
situationRoutes.delete("/:id", controller.destroy);

export default situationRoutes;

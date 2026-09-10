import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRoutes = Router();
const controller = new UserController();

userRoutes.get("/", controller.index);
userRoutes.get("/:id", controller.show);
userRoutes.post("/", controller.store);
userRoutes.put("/:id", controller.update);
userRoutes.delete("/:id", controller.destroy);

export default userRoutes;

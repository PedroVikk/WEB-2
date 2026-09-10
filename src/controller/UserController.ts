import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/UserService";
import { getPaginationParams } from "../helper/pagination";

const userService = new UserService();

export class UserController {
  // GET /users?page=1&limit=10
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const params = getPaginationParams(req.query);
      const result = await userService.findAll(params);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  // GET /users/:id
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findById(Number(req.params.id));

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  // POST /users
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.create(req.body);

      return res.status(201).json(user);
    } catch (error) {
      return next(error);
    }
  }

  // PUT /users/:id
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.update(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }

  // DELETE /users/:id
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.delete(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

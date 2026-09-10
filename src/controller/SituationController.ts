import { NextFunction, Request, Response } from "express";
import { SituationService } from "../service/SituationService";
import { getPaginationParams } from "../helper/pagination";

const situationService = new SituationService();

export class SituationController {
  // GET /situations?page=1&limit=10
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const params = getPaginationParams(req.query);
      const result = await situationService.findAll(params);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  // GET /situations/:id
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const situation = await situationService.findById(Number(req.params.id));

      return res.status(200).json(situation);
    } catch (error) {
      return next(error);
    }
  }

  // POST /situations
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const situation = await situationService.create(req.body);

      return res.status(201).json(situation);
    } catch (error) {
      return next(error);
    }
  }

  // PUT /situations/:id
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const situation = await situationService.update(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json(situation);
    } catch (error) {
      return next(error);
    }
  }

  // DELETE /situations/:id
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await situationService.delete(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

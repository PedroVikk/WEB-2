import { NextFunction, Request, Response } from "express";
import { ProductSituationService } from "../service/ProductSituationService";
import { getPaginationParams } from "../helper/pagination";

const productSituationService = new ProductSituationService();

export class ProductSituationController {
  // GET /product-situations?page=1&limit=10
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const params = getPaginationParams(req.query);
      const result = await productSituationService.findAll(params);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  // GET /product-situations/:id
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const situation = await productSituationService.findById(Number(req.params.id));

      return res.status(200).json(situation);
    } catch (error) {
      return next(error);
    }
  }

  // POST /product-situations
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const situation = await productSituationService.create(req.body);

      return res.status(201).json(situation);
    } catch (error) {
      return next(error);
    }
  }

  // PUT /product-situations/:id
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const situation = await productSituationService.update(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json(situation);
    } catch (error) {
      return next(error);
    }
  }

  // DELETE /product-situations/:id
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await productSituationService.delete(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

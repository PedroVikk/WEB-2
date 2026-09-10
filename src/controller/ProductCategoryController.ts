import { NextFunction, Request, Response } from "express";
import { ProductCategoryService } from "../service/ProductCategoryService";
import { getPaginationParams } from "../helper/pagination";

const categoryService = new ProductCategoryService();

export class ProductCategoryController {
  // GET /product-categories?page=1&limit=10
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const params = getPaginationParams(req.query);
      const result = await categoryService.findAll(params);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  // GET /product-categories/:id
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.findById(Number(req.params.id));

      return res.status(200).json(category);
    } catch (error) {
      return next(error);
    }
  }

  // POST /product-categories
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.create(req.body);

      return res.status(201).json(category);
    } catch (error) {
      return next(error);
    }
  }

  // PUT /product-categories/:id
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.update(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json(category);
    } catch (error) {
      return next(error);
    }
  }

  // DELETE /product-categories/:id
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await categoryService.delete(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

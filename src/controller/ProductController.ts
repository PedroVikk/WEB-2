import { NextFunction, Request, Response } from "express";
import { ProductService } from "../service/ProductService";
import { getPaginationParams } from "../helper/pagination";

const productService = new ProductService();

export class ProductController {
  // GET /products?page=1&limit=10&productCategoryId=1&productSituationId=1
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const params = getPaginationParams(req.query);

      const result = await productService.findAll(params, {
        productCategoryId: req.query.productCategoryId
          ? Number(req.query.productCategoryId)
          : undefined,
        productSituationId: req.query.productSituationId
          ? Number(req.query.productSituationId)
          : undefined,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }

  // GET /products/:id
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.findById(Number(req.params.id));

      return res.status(200).json(product);
    } catch (error) {
      return next(error);
    }
  }

  // POST /products
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.create(req.body);

      return res.status(201).json(product);
    } catch (error) {
      return next(error);
    }
  }

  // PUT /products/:id
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.update(
        Number(req.params.id),
        req.body
      );

      return res.status(200).json(product);
    } catch (error) {
      return next(error);
    }
  }

  // DELETE /products/:id
  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.delete(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}

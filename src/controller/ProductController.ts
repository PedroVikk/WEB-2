import { DeepPartial } from "typeorm";
import { BaseController } from "./BaseController";
import { Product } from "../entity/Product";
import { ProductService } from "../service/ProductService";

export class ProductController extends BaseController<Product> {
  constructor() {
    super(new ProductService(), {
      productSituation: true,
      productCategory: true,
    });
  }

  protected pickBody(body: Record<string, unknown>): DeepPartial<Product> {
    const data: DeepPartial<Product> = {};

    if (body.name !== undefined) {
      data.name = String(body.name);
    }

    if (body.productSituationId !== undefined) {
      data.productSituationId = Number(body.productSituationId);
    }

    if (body.productCategoryId !== undefined) {
      data.productCategoryId = Number(body.productCategoryId);
    }

    return data;
  }

  protected validate(body: Record<string, unknown>): string[] {
    const errors: string[] = [];

    if (!body.name) {
      errors.push("O campo 'name' é obrigatório.");
    }

    if (!body.productSituationId) {
      errors.push("O campo 'productSituationId' é obrigatório.");
    }

    if (!body.productCategoryId) {
      errors.push("O campo 'productCategoryId' é obrigatório.");
    }

    return errors;
  }
}

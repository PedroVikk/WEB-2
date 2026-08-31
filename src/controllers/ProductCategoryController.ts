import { DeepPartial } from "typeorm";
import { BaseController } from "./BaseController";
import { ProductCategory } from "../entity/ProductCategories";
import { ProductCategoryService } from "../service/ProductCategoryService";

export class ProductCategoryController extends BaseController<ProductCategory> {
  constructor() {
    super(new ProductCategoryService());
  }

  protected pickBody(
    body: Record<string, unknown>
  ): DeepPartial<ProductCategory> {
    const data: DeepPartial<ProductCategory> = {};

    if (body.name !== undefined) {
      data.name = String(body.name);
    }

    return data;
  }

  protected validate(body: Record<string, unknown>): string[] {
    const errors: string[] = [];

    if (!body.name) {
      errors.push("O campo 'name' é obrigatório.");
    }

    return errors;
  }
}

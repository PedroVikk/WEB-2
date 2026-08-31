import { AppDataSource } from "../data-source";
import { ProductCategory } from "../entity/ProductCategories";
import { BaseService } from "./BaseService";

export class ProductCategoryService extends BaseService<ProductCategory> {
  constructor() {
    super(AppDataSource.getRepository(ProductCategory));
  }
}

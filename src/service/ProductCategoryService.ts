import { AppDataSource } from "../data-source";
import { ProductCategory } from "../entity/ProductCategory";
import { BaseService } from "./BaseService";

export class ProductCategoryService extends BaseService<ProductCategory> {
  constructor() {
    super(AppDataSource.getRepository(ProductCategory));
  }
}

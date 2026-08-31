import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { BaseService } from "./BaseService";

export class ProductService extends BaseService<Product> {
  constructor() {
    super(AppDataSource.getRepository(Product));
  }
}

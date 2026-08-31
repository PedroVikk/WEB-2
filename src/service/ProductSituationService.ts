import { AppDataSource } from "../data-source";
import { ProductSituation } from "../entity/ProductSituations";
import { BaseService } from "./BaseService";

export class ProductSituationService extends BaseService<ProductSituation> {
  constructor() {
    super(AppDataSource.getRepository(ProductSituation));
  }
}

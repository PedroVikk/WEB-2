import { DeepPartial } from "typeorm";
import { BaseController } from "./BaseController";
import { ProductSituation } from "../entity/ProductSituations";
import { ProductSituationService } from "../service/ProductSituationService";

export class ProductSituationController extends BaseController<ProductSituation> {
  constructor() {
    super(new ProductSituationService());
  }

  protected pickBody(
    body: Record<string, unknown>
  ): DeepPartial<ProductSituation> {
    const data: DeepPartial<ProductSituation> = {};

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

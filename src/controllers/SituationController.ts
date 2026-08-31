import { DeepPartial } from "typeorm";
import { BaseController } from "./BaseController";
import { Situation } from "../entity/Situations";
import { SituationService } from "../service/SituationService";

export class SituationController extends BaseController<Situation> {
  constructor() {
    super(new SituationService());
  }

  protected pickBody(body: Record<string, unknown>): DeepPartial<Situation> {
    const data: DeepPartial<Situation> = {};

    if (body.nameSituation !== undefined) {
      data.nameSituation = String(body.nameSituation);
    }

    return data;
  }

  protected validate(body: Record<string, unknown>): string[] {
    const errors: string[] = [];

    if (!body.nameSituation) {
      errors.push("O campo 'nameSituation' é obrigatório.");
    }

    return errors;
  }
}

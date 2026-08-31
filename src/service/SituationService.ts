import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situations";
import { BaseService } from "./BaseService";

export class SituationService extends BaseService<Situation> {
  constructor() {
    super(AppDataSource.getRepository(Situation));
  }
}

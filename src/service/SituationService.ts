import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situation";
import { AppError } from "../helper/AppError";
import {
  buildPaginatedResult,
  PaginatedResult,
  PaginationParams,
} from "../helper/pagination";

interface SituationData {
  nameSituation: string;
}

export class SituationService {
  // O repositorio so e buscado depois que o AppDataSource esta inicializado
  private get repository(): Repository<Situation> {
    return AppDataSource.getRepository(Situation);
  }

  // Listagem paginada
  async findAll(params: PaginationParams): Promise<PaginatedResult<Situation>> {
    const [data, total] = await this.repository.findAndCount({
      skip: params.skip,
      take: params.limit,
      order: { id: "ASC" },
    });

    return buildPaginatedResult(data, total, params);
  }

  async findById(id: number): Promise<Situation> {
    const situation = await this.repository.findOneBy({ id });

    if (!situation) {
      throw new AppError("Situacao nao encontrada.", 404);
    }

    return situation;
  }

  async create(data: SituationData): Promise<Situation> {
    if (!data.nameSituation) {
      throw new AppError("O campo nameSituation e obrigatorio.");
    }

    const situation = this.repository.create({
      nameSituation: data.nameSituation,
    });

    return this.repository.save(situation);
  }

  async update(id: number, data: SituationData): Promise<Situation> {
    const situation = await this.findById(id);

    if (!data.nameSituation) {
      throw new AppError("O campo nameSituation e obrigatorio.");
    }

    situation.nameSituation = data.nameSituation;

    return this.repository.save(situation);
  }

  async delete(id: number): Promise<void> {
    const situation = await this.findById(id);
    await this.repository.remove(situation);
  }
}

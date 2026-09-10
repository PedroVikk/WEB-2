import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ProductSituation } from "../entity/ProductSituation";
import { AppError } from "../helper/AppError";
import {
  buildPaginatedResult,
  PaginatedResult,
  PaginationParams,
} from "../helper/pagination";

interface ProductSituationData {
  name: string;
}

export class ProductSituationService {
  private get repository(): Repository<ProductSituation> {
    return AppDataSource.getRepository(ProductSituation);
  }

  async findAll(
    params: PaginationParams
  ): Promise<PaginatedResult<ProductSituation>> {
    const [data, total] = await this.repository.findAndCount({
      skip: params.skip,
      take: params.limit,
      order: { id: "ASC" },
    });

    return buildPaginatedResult(data, total, params);
  }

  async findById(id: number): Promise<ProductSituation> {
    const situation = await this.repository.findOneBy({ id });

    if (!situation) {
      throw new AppError("Situacao de produto nao encontrada.", 404);
    }

    return situation;
  }

  async create(data: ProductSituationData): Promise<ProductSituation> {
    if (!data.name) {
      throw new AppError("O campo name e obrigatorio.");
    }

    const situation = this.repository.create({ name: data.name });

    return this.repository.save(situation);
  }

  async update(
    id: number,
    data: ProductSituationData
  ): Promise<ProductSituation> {
    const situation = await this.findById(id);

    if (!data.name) {
      throw new AppError("O campo name e obrigatorio.");
    }

    situation.name = data.name;

    return this.repository.save(situation);
  }

  async delete(id: number): Promise<void> {
    const situation = await this.findById(id);
    await this.repository.remove(situation);
  }
}

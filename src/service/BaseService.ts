import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";
import {
  buildPaginatedResult,
  PaginatedResult,
  PaginationParams,
} from "../helper/pagination";

/**
 * Serviço genérico de CRUD com paginação.
 * Cada serviço concreto apenas injeta o repositório da sua entidade.
 */
export abstract class BaseService<T extends ObjectLiteral & { id: number }> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async findAll(
    params: PaginationParams,
    relations?: FindOptionsRelations<T>
  ): Promise<PaginatedResult<T>> {
    const [data, total] = await this.repository.findAndCount({
      skip: params.skip,
      take: params.limit,
      order: { id: "DESC" } as FindOptionsOrder<T>,
      relations,
    });

    return buildPaginatedResult(data, total, params);
  }

  findById(
    id: number,
    relations?: FindOptionsRelations<T>
  ): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations,
    });
  }

  create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: number, data: DeepPartial<T>): Promise<T | null> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });

    if (!entity) {
      return null;
    }

    this.repository.merge(entity, data);
    return this.repository.save(entity);
  }

  async delete(id: number): Promise<T | null> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });

    if (!entity) {
      return null;
    }

    await this.repository.remove(entity);
    return entity;
  }
}

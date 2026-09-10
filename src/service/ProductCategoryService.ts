import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ProductCategory } from "../entity/ProductCategory";
import { AppError } from "../helper/AppError";
import {
  buildPaginatedResult,
  PaginatedResult,
  PaginationParams,
} from "../helper/pagination";

interface ProductCategoryData {
  name: string;
}

export class ProductCategoryService {
  private get repository(): Repository<ProductCategory> {
    return AppDataSource.getRepository(ProductCategory);
  }

  async findAll(
    params: PaginationParams
  ): Promise<PaginatedResult<ProductCategory>> {
    const [data, total] = await this.repository.findAndCount({
      skip: params.skip,
      take: params.limit,
      order: { id: "ASC" },
    });

    return buildPaginatedResult(data, total, params);
  }

  async findById(id: number): Promise<ProductCategory> {
    const category = await this.repository.findOneBy({ id });

    if (!category) {
      throw new AppError("Categoria nao encontrada.", 404);
    }

    return category;
  }

  async create(data: ProductCategoryData): Promise<ProductCategory> {
    if (!data.name) {
      throw new AppError("O campo name e obrigatorio.");
    }

    const category = this.repository.create({ name: data.name });

    return this.repository.save(category);
  }

  async update(
    id: number,
    data: ProductCategoryData
  ): Promise<ProductCategory> {
    const category = await this.findById(id);

    if (!data.name) {
      throw new AppError("O campo name e obrigatorio.");
    }

    category.name = data.name;

    return this.repository.save(category);
  }

  async delete(id: number): Promise<void> {
    const category = await this.findById(id);
    await this.repository.remove(category);
  }
}

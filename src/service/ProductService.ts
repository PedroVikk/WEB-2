import { FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { ProductCategory } from "../entity/ProductCategory";
import { ProductSituation } from "../entity/ProductSituation";
import { AppError } from "../helper/AppError";
import {
  buildPaginatedResult,
  PaginatedResult,
  PaginationParams,
} from "../helper/pagination";

interface ProductData {
  name: string;
  productSituationId: number;
  productCategoryId: number;
}

interface ProductFilter {
  productCategoryId?: number;
  productSituationId?: number;
}

export class ProductService {
  private get repository(): Repository<Product> {
    return AppDataSource.getRepository(Product);
  }

  private get categoryRepository(): Repository<ProductCategory> {
    return AppDataSource.getRepository(ProductCategory);
  }

  private get situationRepository(): Repository<ProductSituation> {
    return AppDataSource.getRepository(ProductSituation);
  }

  // Listagem paginada, aceitando filtro por categoria e por situacao
  async findAll(
    params: PaginationParams,
    filter: ProductFilter = {}
  ): Promise<PaginatedResult<Product>> {
    const where: FindOptionsWhere<Product> = {};

    if (filter.productCategoryId) {
      where.productCategoryId = Number(filter.productCategoryId);
    }

    if (filter.productSituationId) {
      where.productSituationId = Number(filter.productSituationId);
    }

    const [data, total] = await this.repository.findAndCount({
      where,
      relations: { productCategory: true, productSituation: true },
      skip: params.skip,
      take: params.limit,
      order: { id: "ASC" },
    });

    return buildPaginatedResult(data, total, params);
  }

  async findById(id: number): Promise<Product> {
    const product = await this.repository.findOne({
      where: { id },
      relations: { productCategory: true, productSituation: true },
    });

    if (!product) {
      throw new AppError("Produto nao encontrado.", 404);
    }

    return product;
  }

  async create(data: ProductData): Promise<Product> {
    await this.validate(data);

    const product = this.repository.create({
      name: data.name,
      productSituationId: Number(data.productSituationId),
      productCategoryId: Number(data.productCategoryId),
    });

    await this.repository.save(product);

    return this.findById(product.id);
  }

  async update(id: number, data: ProductData): Promise<Product> {
    const product = await this.findById(id);

    await this.validate(data);

    product.name = data.name;
    product.productSituationId = Number(data.productSituationId);
    product.productCategoryId = Number(data.productCategoryId);

    await this.repository.save(product);

    return this.findById(product.id);
  }

  async delete(id: number): Promise<void> {
    const product = await this.findById(id);
    await this.repository.remove(product);
  }

  // Validacoes usadas no create e no update
  private async validate(data: ProductData): Promise<void> {
    if (!data.name || !data.productSituationId || !data.productCategoryId) {
      throw new AppError(
        "Os campos name, productSituationId e productCategoryId sao obrigatorios."
      );
    }

    const situation = await this.situationRepository.findOneBy({
      id: Number(data.productSituationId),
    });

    if (!situation) {
      throw new AppError("A situacao de produto informada nao existe.", 404);
    }

    const category = await this.categoryRepository.findOneBy({
      id: Number(data.productCategoryId),
    });

    if (!category) {
      throw new AppError("A categoria informada nao existe.", 404);
    }
  }
}

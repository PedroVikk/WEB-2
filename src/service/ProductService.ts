import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

export class ProductService {
  private repository: Repository<Product> = AppDataSource.getRepository(Product);

  findAll(): Promise<Product[]> {
    return this.repository.find({ order: { id: "DESC" } });
  }

  findById(id: number): Promise<Product | null> {
    return this.repository.findOneBy({ id });
  }

  create(data: Partial<Product>): Promise<Product> {
    const product = this.repository.create(data);
    return this.repository.save(product);
  }

  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    const product = await this.repository.findOneBy({ id });

    if (!product) {
      return null;
    }

    this.repository.merge(product, data);
    return this.repository.save(product);
  }

  async delete(id: number): Promise<Product | null> {
    const product = await this.repository.findOneBy({ id });

    if (!product) {
      return null;
    }

    await this.repository.remove(product);
    return product;
  }
}

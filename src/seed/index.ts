import { DataSource } from "typeorm";
import { Situation } from "../entity/Situations";
import { User } from "../entity/Users";
import { ProductCategory } from "../entity/ProductCategories";
import { ProductSituation } from "../entity/ProductSituations";
import { Product } from "../entity/Products";

/**
 * Popula as tabelas com registros de teste.
 * As seeds são idempotentes: cada bloco só roda se a tabela estiver vazia.
 */
export async function runSeeders(dataSource: DataSource): Promise<void> {
  const situationRepo = dataSource.getRepository(Situation);
  const userRepo = dataSource.getRepository(User);
  const categoryRepo = dataSource.getRepository(ProductCategory);
  const productSituationRepo = dataSource.getRepository(ProductSituation);
  const productRepo = dataSource.getRepository(Product);

  if ((await situationRepo.count()) === 0) {
    await situationRepo.save([
      situationRepo.create({ nameSituation: "Ativo" }),
      situationRepo.create({ nameSituation: "Inativo" }),
    ]);
    console.log("-> situations populada");
  }

  if ((await categoryRepo.count()) === 0) {
    await categoryRepo.save([
      categoryRepo.create({ name: "Eletrônicos" }),
      categoryRepo.create({ name: "Vestuário" }),
      categoryRepo.create({ name: "Alimentos" }),
    ]);
    console.log("-> product_categories populada");
  }

  if ((await productSituationRepo.count()) === 0) {
    await productSituationRepo.save([
      productSituationRepo.create({ name: "Disponível" }),
      productSituationRepo.create({ name: "Esgotado" }),
    ]);
    console.log("-> product_situations populada");
  }

  if ((await userRepo.count()) === 0) {
    const ativo = await situationRepo.findOneByOrFail({
      nameSituation: "Ativo",
    });

    await userRepo.save([
      userRepo.create({
        name: "Administrador",
        email: "admin@nodeapi.dev",
        situationId: ativo.id,
      }),
      userRepo.create({
        name: "João da Silva",
        email: "joao@nodeapi.dev",
        situationId: ativo.id,
      }),
    ]);
    console.log("-> users populada");
  }

  if ((await productRepo.count()) === 0) {
    const eletronicos = await categoryRepo.findOneByOrFail({
      name: "Eletrônicos",
    });
    const disponivel = await productSituationRepo.findOneByOrFail({
      name: "Disponível",
    });

    await productRepo.save([
      productRepo.create({
        name: "Notebook",
        productCategoryId: eletronicos.id,
        productSituationId: disponivel.id,
      }),
      productRepo.create({
        name: "Mouse sem fio",
        productCategoryId: eletronicos.id,
        productSituationId: disponivel.id,
      }),
    ]);
    console.log("-> products populada");
  }
}

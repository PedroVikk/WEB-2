import { DataSource } from "typeorm";
import { ProductCategory } from "../entity/ProductCategory";

// Popula a tabela de categorias de produto
export async function productCategorySeed(
  dataSource: DataSource
): Promise<void> {
  const repository = dataSource.getRepository(ProductCategory);
  const nomes = ["Informatica", "Eletrodomesticos", "Moveis", "Papelaria"];

  for (const nome of nomes) {
    const jaExiste = await repository.findOneBy({ name: nome });

    if (!jaExiste) {
      await repository.save(repository.create({ name: nome }));
      console.log(`Categoria "${nome}" cadastrada.`);
    }
  }
}

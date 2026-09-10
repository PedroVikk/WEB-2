import { DataSource } from "typeorm";
import { ProductSituation } from "../entity/ProductSituation";

// Popula a tabela de situacoes de produto
export async function productSituationSeed(
  dataSource: DataSource
): Promise<void> {
  const repository = dataSource.getRepository(ProductSituation);
  const nomes = ["Disponivel", "Esgotado", "Descontinuado"];

  for (const nome of nomes) {
    const jaExiste = await repository.findOneBy({ name: nome });

    if (!jaExiste) {
      await repository.save(repository.create({ name: nome }));
      console.log(`Situacao de produto "${nome}" cadastrada.`);
    }
  }
}

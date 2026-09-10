import { DataSource } from "typeorm";
import { Product } from "../entity/Product";
import { ProductCategory } from "../entity/ProductCategory";
import { ProductSituation } from "../entity/ProductSituation";

// Popula a tabela de produtos usando as categorias e situacoes ja cadastradas
export async function productSeed(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(Product);
  const categoryRepository = dataSource.getRepository(ProductCategory);
  const situationRepository = dataSource.getRepository(ProductSituation);

  const informatica = await categoryRepository.findOneBy({
    name: "Informatica",
  });
  const papelaria = await categoryRepository.findOneBy({ name: "Papelaria" });

  const disponivel = await situationRepository.findOneBy({
    name: "Disponivel",
  });
  const esgotado = await situationRepository.findOneBy({ name: "Esgotado" });

  if (!informatica || !papelaria || !disponivel || !esgotado) {
    console.log(
      "Rode o seed das categorias e das situacoes antes do seed de produtos."
    );
    return;
  }

  const produtos = [
    {
      name: "Notebook Dell",
      productCategoryId: informatica.id,
      productSituationId: disponivel.id,
    },
    {
      name: "Teclado Mecanico",
      productCategoryId: informatica.id,
      productSituationId: disponivel.id,
    },
    {
      name: "Monitor 24 polegadas",
      productCategoryId: informatica.id,
      productSituationId: esgotado.id,
    },
    {
      name: "Caderno Universitario",
      productCategoryId: papelaria.id,
      productSituationId: disponivel.id,
    },
    {
      name: "Caneta Esferografica",
      productCategoryId: papelaria.id,
      productSituationId: disponivel.id,
    },
  ];

  for (const produto of produtos) {
    const jaExiste = await repository.findOneBy({ name: produto.name });

    if (!jaExiste) {
      await repository.save(repository.create(produto));
      console.log(`Produto "${produto.name}" cadastrado.`);
    }
  }
}

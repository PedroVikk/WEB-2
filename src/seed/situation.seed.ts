import { DataSource } from "typeorm";
import { Situation } from "../entity/Situation";

// Popula a tabela de situacoes do usuario
export async function situationSeed(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(Situation);
  const nomes = ["Ativo", "Inativo", "Bloqueado"];

  for (const nomeSituacao of nomes) {
    const jaExiste = await repository.findOneBy({ nameSituation: nomeSituacao });

    if (!jaExiste) {
      await repository.save(repository.create({ nameSituation: nomeSituacao }));
      console.log(`Situacao "${nomeSituacao}" cadastrada.`);
    }
  }
}

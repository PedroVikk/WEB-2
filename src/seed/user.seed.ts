import { DataSource } from "typeorm";
import { Situation } from "../entity/Situation";
import { User } from "../entity/User";

// Popula a tabela de usuarios usando as situacoes ja cadastradas
export async function userSeed(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(User);
  const situationRepository = dataSource.getRepository(Situation);

  const ativo = await situationRepository.findOneBy({ nameSituation: "Ativo" });
  const inativo = await situationRepository.findOneBy({
    nameSituation: "Inativo",
  });

  if (!ativo || !inativo) {
    console.log("Rode o seed das situacoes antes do seed de usuarios.");
    return;
  }

  const usuarios = [
    { name: "Pedro Victor", email: "pedro@email.com", situationId: ativo.id },
    { name: "Maria Souza", email: "maria@email.com", situationId: ativo.id },
    { name: "Joao Silva", email: "joao@email.com", situationId: inativo.id },
    { name: "Ana Lima", email: "ana@email.com", situationId: ativo.id },
  ];

  for (const usuario of usuarios) {
    const jaExiste = await repository.findOneBy({ email: usuario.email });

    if (!jaExiste) {
      await repository.save(repository.create(usuario));
      console.log(`Usuario "${usuario.name}" cadastrado.`);
    }
  }
}

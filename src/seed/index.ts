import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { situationSeed } from "./situation.seed";
import { userSeed } from "./user.seed";
import { productCategorySeed } from "./productCategory.seed";
import { productSituationSeed } from "./productSituation.seed";
import { productSeed } from "./product.seed";

// Roda todos os seeds na ordem certa (primeiro as tabelas que sao referenciadas)
async function runSeeds() {
  await AppDataSource.initialize();
  console.log("Banco conectado, iniciando os seeds...");

  await situationSeed(AppDataSource);
  await userSeed(AppDataSource);
  await productCategorySeed(AppDataSource);
  await productSituationSeed(AppDataSource);
  await productSeed(AppDataSource);

  await AppDataSource.destroy();
  console.log("Seeds finalizados!");
}

runSeeds().catch((error) => {
  console.error("Erro ao rodar os seeds:", error);
  process.exit(1);
});

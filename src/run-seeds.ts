import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { runSeeders } from "./seed";

AppDataSource.initialize()
  .then(async () => {
    console.log("Executando seeds...");
    await runSeeders(AppDataSource);
    console.log("Seeds executadas com sucesso!");
    await AppDataSource.destroy();
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("Erro ao executar as seeds:", error);
    process.exit(1);
  });

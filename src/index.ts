//Importa a biblioteca express
import express from "express";
//Importa a metadata (necessaria para os decorators do TypeORM)
import "reflect-metadata";
//Importa e carrega as variaveis de ambiente
import dotenv from "dotenv";
dotenv.config();

//Importa a conexao com o banco de dados e as rotas da API
import { AppDataSource } from "./data-source";
import { routes } from "./routes";

//Cria a aplicacao express
const app = express();
//Habilita o recebimento de JSON no corpo das requisicoes
app.use(express.json());

//Rota raiz de boas-vindas
app.get("/", (req, res) => {
  res.send("API NodeJS/Express rodando!");
});

//Registra as rotas dos recursos da API
app.use(routes);

//Inicializa a conexao com o BD e, em seguida, sobe o servidor
AppDataSource.initialize()
  .then(() => {
    console.log("Conexao com o BD sucedida!");

    app.listen(process.env.PORT, () => {
      console.log(
        `Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("Erro na conexao com o BD.", error);
  });

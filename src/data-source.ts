import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

//Carrega as variaveis de ambiente (necessario tambem quando o data-source e usado pelo CLI)
dotenv.config();

//Dialeto do banco; usa "mysql" como padrao caso a variavel nao esteja definida
const dialect = process.env.DB_DIALECT ?? "mysql";

//Credenciais e configuracao da conexao com o banco de dados
export const AppDataSource = new DataSource({
  type: dialect as "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: ["dist/entity/**/*.js"],
  subscribers: [],
  migrations: ["dist/migration/**/*.js"],
});

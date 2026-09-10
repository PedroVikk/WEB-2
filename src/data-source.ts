import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

// __dirname aponta para /src quando roda com ts-node e para /dist depois do build,
// por isso o glob aceita as duas extensoes
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: process.env.DB_LOGGING === "true",
  entities: [path.join(__dirname, "entity", "**", "*.{ts,js}")],
  migrations: [path.join(__dirname, "migration", "**", "*.{ts,js}")],
  subscribers: [],
});

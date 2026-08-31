import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.SERVER_PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API NodeJS/Express rodando!" });
});

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
  });

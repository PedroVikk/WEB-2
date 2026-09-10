import { NextFunction, Request, Response } from "express";
import { AppError } from "../helper/AppError";

// Middleware que centraliza o tratamento de erros da API
export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);

  return res.status(500).json({ message: "Erro interno no servidor." });
}

// Middleware para rotas que nao existem
export function notFoundHandler(req: Request, res: Response) {
  return res.status(404).json({
    message: `Rota nao encontrada: ${req.method} ${req.originalUrl}`,
  });
}

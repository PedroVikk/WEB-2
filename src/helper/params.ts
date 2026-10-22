import { AppError } from "./AppError";

// Le o :id da rota e garante que veio um numero inteiro valido,
// evitando que um NaN chegue ate a consulta do banco
export function getIdParam(value: string): number {
  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) {
    throw new AppError("O id informado e invalido.");
  }

  return id;
}

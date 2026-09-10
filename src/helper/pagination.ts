// Helper usado pelos services para montar a paginacao das listagens

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

// Le os parametros ?page= e ?limit= da requisicao e trata valores invalidos
export function getPaginationParams(query: any): PaginationParams {
  let page = Number(query?.page);
  let limit = Number(query?.limit);

  if (!Number.isInteger(page) || page < 1) {
    page = DEFAULT_PAGE;
  }

  if (!Number.isInteger(limit) || limit < 1) {
    limit = DEFAULT_LIMIT;
  }

  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT;
  }

  return { page, limit, skip: (page - 1) * limit };
}

// Monta o retorno padrao das listagens paginadas
export function buildPaginatedResult<T>(
  data: T[],
  total: number,
  params: PaginationParams
): PaginatedResult<T> {
  const totalPages = total === 0 ? 0 : Math.ceil(total / params.limit);

  return {
    data,
    pagination: {
      total,
      page: params.page,
      limit: params.limit,
      totalPages,
      hasPreviousPage: params.page > 1,
      hasNextPage: params.page < totalPages,
    },
  };
}

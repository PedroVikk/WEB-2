import { Request, Response } from "express";
import { DeepPartial, FindOptionsRelations, ObjectLiteral } from "typeorm";
import { BaseService } from "../service/BaseService";
import { getPaginationParams } from "../helper/pagination";

/**
 * Controller genérico de CRUD.
 * Os métodos são arrow functions para preservar o "this" ao serem
 * usados como handlers do Express.
 */
export abstract class BaseController<T extends ObjectLiteral & { id: number }> {
  protected constructor(
    protected readonly service: BaseService<T>,
    protected readonly relations?: FindOptionsRelations<T>
  ) {}

  /** Campos aceitos no corpo da requisição (create/update). */
  protected abstract pickBody(body: Record<string, unknown>): DeepPartial<T>;

  /** Validação simples; retorna a lista de mensagens de erro. */
  protected validate(_body: Record<string, unknown>): string[] {
    return [];
  }

  index = async (req: Request, res: Response): Promise<void> => {
    const params = getPaginationParams(req.query);
    const result = await this.service.findAll(params, this.relations);
    res.json(result);
  };

  show = async (req: Request, res: Response): Promise<void> => {
    const item = await this.service.findById(
      Number(req.params.id),
      this.relations
    );

    if (!item) {
      res.status(404).json({ message: "Registro não encontrado." });
      return;
    }

    res.json(item);
  };

  store = async (req: Request, res: Response): Promise<void> => {
    const errors = this.validate(req.body ?? {});

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const created = await this.service.create(this.pickBody(req.body ?? {}));
    res.status(201).json(created);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const updated = await this.service.update(
      Number(req.params.id),
      this.pickBody(req.body ?? {})
    );

    if (!updated) {
      res.status(404).json({ message: "Registro não encontrado." });
      return;
    }

    res.json(updated);
  };

  destroy = async (req: Request, res: Response): Promise<void> => {
    const deleted = await this.service.delete(Number(req.params.id));

    if (!deleted) {
      res.status(404).json({ message: "Registro não encontrado." });
      return;
    }

    res.status(204).send();
  };
}

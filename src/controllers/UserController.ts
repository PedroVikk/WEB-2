import { DeepPartial } from "typeorm";
import { BaseController } from "./BaseController";
import { User } from "../entity/Users";
import { UserService } from "../service/UserService";

export class UserController extends BaseController<User> {
  constructor() {
    super(new UserService(), { situation: true });
  }

  protected pickBody(body: Record<string, unknown>): DeepPartial<User> {
    const data: DeepPartial<User> = {};

    if (body.name !== undefined) {
      data.name = String(body.name);
    }

    if (body.email !== undefined) {
      data.email = String(body.email);
    }

    if (body.situationId !== undefined) {
      data.situationId = Number(body.situationId);
    }

    return data;
  }

  protected validate(body: Record<string, unknown>): string[] {
    const errors: string[] = [];

    if (!body.name) {
      errors.push("O campo 'name' é obrigatório.");
    }

    if (!body.email) {
      errors.push("O campo 'email' é obrigatório.");
    }

    if (!body.situationId) {
      errors.push("O campo 'situationId' é obrigatório.");
    }

    return errors;
  }
}

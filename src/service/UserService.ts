import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Situation } from "../entity/Situation";
import { AppError } from "../helper/AppError";
import {
  buildPaginatedResult,
  PaginatedResult,
  PaginationParams,
} from "../helper/pagination";

interface UserData {
  name: string;
  email: string;
  situationId: number;
}

export class UserService {
  private get repository(): Repository<User> {
    return AppDataSource.getRepository(User);
  }

  private get situationRepository(): Repository<Situation> {
    return AppDataSource.getRepository(Situation);
  }

  // Listagem paginada trazendo junto a situacao do usuario
  async findAll(params: PaginationParams): Promise<PaginatedResult<User>> {
    const [data, total] = await this.repository.findAndCount({
      relations: { situation: true },
      skip: params.skip,
      take: params.limit,
      order: { id: "ASC" },
    });

    return buildPaginatedResult(data, total, params);
  }

  async findById(id: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id },
      relations: { situation: true },
    });

    if (!user) {
      throw new AppError("Usuario nao encontrado.", 404);
    }

    return user;
  }

  async create(data: UserData): Promise<User> {
    await this.validate(data);

    const emailEmUso = await this.repository.findOneBy({ email: data.email });

    if (emailEmUso) {
      throw new AppError("Ja existe um usuario com esse e-mail.", 409);
    }

    const user = this.repository.create({
      name: data.name,
      email: data.email,
      situationId: Number(data.situationId),
    });

    await this.repository.save(user);

    return this.findById(user.id);
  }

  async update(id: number, data: UserData): Promise<User> {
    const user = await this.findById(id);

    await this.validate(data);

    const emailEmUso = await this.repository.findOneBy({ email: data.email });

    if (emailEmUso && emailEmUso.id !== user.id) {
      throw new AppError("Ja existe um usuario com esse e-mail.", 409);
    }

    user.name = data.name;
    user.email = data.email;
    user.situationId = Number(data.situationId);

    await this.repository.save(user);

    return this.findById(user.id);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.repository.remove(user);
  }

  // Validacoes usadas no create e no update
  private async validate(data: UserData): Promise<void> {
    if (!data.name || !data.email || !data.situationId) {
      throw new AppError("Os campos name, email e situationId sao obrigatorios.");
    }

    if (!data.email.includes("@")) {
      throw new AppError("O e-mail informado e invalido.");
    }

    const situation = await this.situationRepository.findOneBy({
      id: Number(data.situationId),
    });

    if (!situation) {
      throw new AppError("A situacao informada nao existe.", 404);
    }
  }
}

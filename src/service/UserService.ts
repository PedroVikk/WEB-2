import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { BaseService } from "./BaseService";

export class UserService extends BaseService<User> {
  constructor() {
    super(AppDataSource.getRepository(User));
  }
}

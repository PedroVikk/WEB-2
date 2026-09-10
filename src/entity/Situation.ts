import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";

// Tabela de situacoes do usuario (ex: Ativo / Inativo)
@Entity("situations")
export class Situation {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ name: "nameSituation", type: "varchar", length: 255 })
  nameSituation!: string;

  @CreateDateColumn({ name: "createdAt", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt", type: "timestamp" })
  updatedAt!: Date;

  @OneToMany(() => User, (user) => user.situation)
  users!: User[];
}

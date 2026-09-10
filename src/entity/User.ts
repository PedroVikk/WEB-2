import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Situation } from "./Situation";

// Tabela de usuarios
@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  email!: string;

  @Column({ name: "situationId", type: "int" })
  situationId!: number;

  @CreateDateColumn({ name: "createdAt", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt", type: "timestamp" })
  updatedAt!: Date;

  // Cada usuario pertence a uma situacao
  @ManyToOne(() => Situation, (situation) => situation.users)
  @JoinColumn({ name: "situationId" })
  situation!: Situation;
}

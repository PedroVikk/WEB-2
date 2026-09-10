import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";

// Tabela de situacoes do produto (ex: Disponivel / Esgotado)
@Entity("product_situations")
export class ProductSituation {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @CreateDateColumn({ name: "createdAt", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt", type: "timestamp" })
  updatedAt!: Date;

  @OneToMany(() => Product, (product) => product.productSituation)
  products!: Product[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ProductSituation } from "./ProductSituation";
import { ProductCategory } from "./ProductCategory";

// Tabela de produtos
@Entity("products")
export class Product {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ name: "productSituationId", type: "int" })
  productSituationId!: number;

  @Column({ name: "productCategoryId", type: "int" })
  productCategoryId!: number;

  @CreateDateColumn({ name: "createdAt", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt", type: "timestamp" })
  updatedAt!: Date;

  // Cada produto tem uma situacao
  @ManyToOne(() => ProductSituation, (situation) => situation.products)
  @JoinColumn({ name: "productSituationId" })
  productSituation!: ProductSituation;

  // Cada produto pertence a uma categoria
  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn({ name: "productCategoryId" })
  productCategory!: ProductCategory;
}

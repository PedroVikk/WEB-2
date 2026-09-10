import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateProductsTable1710000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar", length: "255" },
          { name: "productSituationId", type: "int" },
          { name: "productCategoryId", type: "int" },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // products.productSituationId -> product_situations.id
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        name: "FK_products_product_situations",
        columnNames: ["productSituationId"],
        referencedTableName: "product_situations",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
    );

    // products.productCategoryId -> product_categories.id
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        name: "FK_products_product_categories",
        columnNames: ["productCategoryId"],
        referencedTableName: "product_categories",
        referencedColumnNames: ["id"],
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "products",
      "FK_products_product_categories"
    );
    await queryRunner.dropForeignKey(
      "products",
      "FK_products_product_situations"
    );
    await queryRunner.dropTable("products");
  }
}

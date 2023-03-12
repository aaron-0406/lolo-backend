import { QueryInterface } from "sequelize";
import productModel from "../models/product.model";
const { ProductSchema, PRODUCT_TABLE } = productModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(PRODUCT_TABLE);
}

import { QueryInterface } from "sequelize";
import customerModel from "../models/customer.model";

const { CustomerSchema, CUSTOMER_TABLE } = customerModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
}
export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(CUSTOMER_TABLE);
}

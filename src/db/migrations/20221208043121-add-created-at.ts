import { QueryInterface } from "sequelize";
import customerModel from "../models/customer.model";

const { CustomerSchema, CUSTOMER_TABLE } = customerModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(
    CUSTOMER_TABLE,
    "create_at",
    CustomerSchema.createAt
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(CUSTOMER_TABLE, "create_at");
}

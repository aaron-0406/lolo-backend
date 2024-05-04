import { DataTypes, QueryInterface } from "sequelize";
import customerUserModel from "../models/customer-user.model";

const { CUSTOMER_USER_TABLE } = customerUserModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.removeIndex(CUSTOMER_USER_TABLE, "dni");
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.addIndex(CUSTOMER_USER_TABLE, ["dni"], {
    name: "dni",
    unique: true,
  });
}

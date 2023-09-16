import { DataTypes, QueryInterface } from "sequelize";
import customerUserModel from "../models/customer-user.model";

const { CUSTOMER_USER_TABLE } = customerUserModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(CUSTOMER_USER_TABLE, "privilege");
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.addColumn(CUSTOMER_USER_TABLE, "privilege", {
    allowNull: false,
    type: DataTypes.STRING(6),
  });
}

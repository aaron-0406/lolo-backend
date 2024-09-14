import customerUserModel from "../models/customer-user.model";
import { QueryInterface, DataTypes } from "sequelize";

const { CUSTOMER_USER_TABLE } = customerUserModel

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(CUSTOMER_USER_TABLE, "sub_roles", {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(CUSTOMER_USER_TABLE, "sub_roles");
}


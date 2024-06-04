import { DataTypes, QueryInterface } from "sequelize";
import customerUserModel from "../models/customer-user.model";
import cityModel from "../models/city.model";

const { CUSTOMER_USER_TABLE } = customerUserModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(CUSTOMER_USER_TABLE, "first_access", {
    allowNull: false,
    field: "first_access",
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(CUSTOMER_USER_TABLE, "first_access");
}

import { DataTypes, QueryInterface } from "sequelize";
import customerUserModal from "../models/customer-user.model";

const { CUSTOMER_USER_TABLE } = customerUserModal;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(CUSTOMER_USER_TABLE, "login_attempts", {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    field: "login_attempts"
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(CUSTOMER_USER_TABLE, "login_attempts");
}

import { DataTypes, QueryInterface } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(PERMISSION_TABLE, "link", {
    type: DataTypes.STRING(150),
    allowNull: true,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(PERMISSION_TABLE, "link");
}

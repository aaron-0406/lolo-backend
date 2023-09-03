import { DataTypes, QueryInterface } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.changeColumn(PERMISSION_TABLE, "code", {
    type: DataTypes.STRING(150),
    unique: true,
    allowNull: false,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.changeColumn(PERMISSION_TABLE, "code", {
    type: DataTypes.STRING(150),
    unique: false,
    allowNull: false,
  });
}

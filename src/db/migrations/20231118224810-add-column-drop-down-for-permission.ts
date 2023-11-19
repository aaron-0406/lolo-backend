import { DataTypes, QueryInterface } from "sequelize";
import permissionModal from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModal;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(PERMISSION_TABLE, "drop_down", {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    field: "drop_down"
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(PERMISSION_TABLE, "drop_down");
}

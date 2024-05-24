import { QueryInterface, DataTypes } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(PERMISSION_TABLE, "id_permission_main", {
    allowNull: true,
    field:"id_permission_main",
    type: DataTypes.INTEGER,
    references: {
      model: PERMISSION_TABLE,
      key: "id_permission",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addColumn(PERMISSION_TABLE, "is_dropdown", {
    allowNull: true,
    field: "is_dropdown",
    type: DataTypes.BOOLEAN,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(PERMISSION_TABLE, "id_permission_main");
  await queryInterface.removeColumn(PERMISSION_TABLE, "is_dropdown");
}
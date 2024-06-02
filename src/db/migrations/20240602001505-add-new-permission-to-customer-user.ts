import { QueryInterface, DataTypes } from 'sequelize';
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "REMOVER AUTENTICACIÓN 2FA",
    code: "P10-05",
    icon: "-",
    link: "#",
  },
]

export async function up(queryInterface: QueryInterface) {
  return queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
}

export async function down(queryInterface: QueryInterface) {
  return queryInterface.bulkDelete(PERMISSION_TABLE, {});
}

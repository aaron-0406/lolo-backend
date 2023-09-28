import { QueryInterface } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

export async function up(queryInterface: QueryInterface) {
  return queryInterface.bulkInsert(PERMISSION_TABLE, [
    {
      name: "LOGS DE USUARIOS",
      code: "P12",
      icon: "ri-file-list-line",
      link: "/:urlIdentifier/usuario-logs",
    },
  ]);
}

export async function down(queryInterface: QueryInterface) {
  return queryInterface.bulkDelete(PERMISSION_TABLE, {});
}

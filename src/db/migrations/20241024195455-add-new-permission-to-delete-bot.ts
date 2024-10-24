import { QueryInterface } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel

const newPermissions = [
  {
    name: "ELIMINAR BOT BITACORA",
    code: "P13-01-01-07",
    icon: "-",
    link: "#",
  }
]

export async function up(queryInterface: QueryInterface) {
  try {
    await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions)
  } catch (e) {
    console.log(e)
  }
}

export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.bulkDelete(PERMISSION_TABLE, newPermissions)
  } catch (e) {
    console.log(e)
  }
}


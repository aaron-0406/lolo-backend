import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "DEPARTAMENTOS",
    code: "P34",
    icon: "ri-map-pin-fill",
    link: "/configuracion/:urlIdentifier/departamentos",
    id_permission_main: 185,
  },
  {
    name: "PROVINCIAS",
    code: "P35",
    icon: "ri-map-pin-2-fill",
    link: "/configuracion/:urlIdentifier/provincias",
    id_permission_main: 185,
  },
  {
    name: "DISTRITOS",
    code: "P36",
    icon: "ri-map-pin-3-fill",
    link: "/configuracion/:urlIdentifier/distritos",
    id_permission_main: 185,
  }
]

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
}

export async function down(queryInterface: QueryInterface) {
  const deleteCriteria = {
    code: {
      [Op.startsWith]: ["P34", "P35", "P36"],
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}
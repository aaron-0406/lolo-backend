import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "SEDES JUDICIALES",
    code: "P28",
    icon: "ri-community-fill",
    link: "/judicial/:urlIdentifier/sedes",
  },
  {
    name: "AGREGAR SEDE JUDICIAL",
    code: "P28-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR SEDE JUDICIAL",
    code: "P28-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR SEDE JUDICIAL",
    code: "P28-03",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE SEDES JUDICIALES",
    code: "P28-04",
    icon: "-",
    link: "#",
  },
];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
}

export async function down(queryInterface: QueryInterface) {
  const deleteCriteria = {
    code: {
      [Op.startsWith]: "P28",
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

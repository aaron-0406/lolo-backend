import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "AGREGAR EXPEDIENTE",
    code: "P13-02",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR EXPEDIENTE",
    code: "P13-03",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR EXPEDIENTE",
    code: "P13-04",
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
      [Op.startsWith]: "P13",
    },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

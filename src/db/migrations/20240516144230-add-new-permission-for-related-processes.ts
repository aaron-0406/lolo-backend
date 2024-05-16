import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "BITACORA",
    code: "P13-01-05-01-01",
    icon: "-",
    link: "/judicial/:urlIdentifier/expediente/:code/procesos-conexos/:relatedProcessCode/bitacora",
  },
  {
    name: "AGREGAR BITACORA",
    code: "P13-01-05-01-01-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR BITACORA",
    code: "P13-01-05-01-01-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR BITACORA",
    code: "P13-01-05-01-01-03",
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
      [Op.startsWith]: ["P13-01-05-01-01"],
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}
import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "ACTUACIÓN PROCESAL DEMANDADO",
    code: "P26",
    icon: "ri-book-2-fill",
    link: "/judicial/:urlIdentifier/actuacion-procesal-demandado",
  },
  {
    name: "CREAR ACTUACIÓN PROCESAL DEMANDADO",
    code: "P26-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR ACTUACIÓN PROCESAL DEMANDADO",
    code: "P26-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR ACTUACIÓN PROCESAL DEMANDADO",
    code: "P26-03",
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
      [Op.startsWith]: ["P26"],
    },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

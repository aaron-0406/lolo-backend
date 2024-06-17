import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "COMPARAR EXCELS",
    code: "P33",
    icon: "ri-file-excel-2-fill",
    link: "/configuracion/:urlIdentifier/comparar-excels",
    id_permission_main: 185,
  },
  {
    name: "GENERAR REPORTE",
    code: "P33-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ENVIAR REPORTE",
    code: "P33-02",
    icon: "-",
    link: "#",
  }
];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
}

export async function down(queryInterface: QueryInterface) {
  const deleteCriteria = {
    code: {
      [Op.startsWith]: ["P33"],
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

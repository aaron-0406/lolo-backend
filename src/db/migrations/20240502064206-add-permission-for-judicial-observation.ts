import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "OBSERVACIONES",
    code: "P13-01-02",
    icon: "-",
    link: "/judicial/:urlIdentifier/expediente/:code/observacion",
  },
  {
    name: "AGREGAR OBSERVACIONES",
    code: "P13-01-02-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ASIGNAR OBSERVACIONES",
    code: "P13-01-02-02",
    icon: "-",
    link: "#",
  },
  {
    name: "REMOVER OBSERVACIONES",
    code: "P13-01-02-03",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE OBSERVACIONES",
    code: "P13-01-02-04",
    icon: "-",
    link: "#",
  },
  {
    name: "TIPO OBSERVACION",
    code: "P23",
    icon: "ri-search-eye-fill",
    link: "/judicial/:urlIdentifier/tipo-observacion",
  },
  {
    name: "AGREGAR TIPO OBSERVACION",
    code: "P23-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR TIPO OBSERVACION",
    code: "P23-02",
    icon: "-",
    link: "#",
  },
  {
    name: "REMOVER TIPO OBSERVACION",
    code: "P23-03",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE TIPO OBSERVACION",
    code: "P23-04",
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
      [Op.startsWith]: ["P23", "P13-01-02"],
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

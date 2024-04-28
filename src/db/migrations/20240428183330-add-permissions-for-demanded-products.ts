import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "PRODUCTOS DEMANDADOS",
    code: "P13-01-03",
    icon: "-",
    link: "/judicial/:urlIdentifier/expedientes/:code/productos-demandados",
  },
  {
    name: "AGREGAR PRODUCTO DEMANDADO",
    code: "P13-01-03-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ASIGNAR PRODUCTOS DEMANDADOS",
    code: "P13-01-03-02",
    icon: "-",
    link: "#",
  },
  {
    name: "REMOVER PRODUCTO DEMANDADO",
    code: "P13-01-03-03",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE PRODUCTOS DEMANDADOS",
    code: "P13-01-03-04",
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
      [Op.startsWith]: "P13-01-03",
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

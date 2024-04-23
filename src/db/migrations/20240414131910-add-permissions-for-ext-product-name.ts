import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "NOMBRE DE PRODUCTO",
    code: "P19",
    icon: "ri-bank-card-fill",
    link: "/cobranza/:urlIdentifier/nombre-producto",
  },
  {
    name: "AGREGAR NOMBRE PRODUCTO",
    code: "P19-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR NOMBRE PRODUCTO",
    code: "P19-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR NOMBRE PRODUCTO",
    code: "P19-03",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE NOMBRE PRODUCTOS",
    code: "P19-04",
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
      [Op.startsWith]: "P19",
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

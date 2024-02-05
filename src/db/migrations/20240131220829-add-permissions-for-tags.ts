import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "ETIQUETAS",
    code: "P14",
    icon: "ri-flag-fill",
    link: "/cobranza/:urlIdentifier/etiquetas",
  },
  {
    name: "AGREGAR ETIQUETA",
    code: "P14-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR ETIQUETA",
    code: "P14-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR ETIQUETA",
    code: "P14-03",
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
      [Op.startsWith]: "P14",
    },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

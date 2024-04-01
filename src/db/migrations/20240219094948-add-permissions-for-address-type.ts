import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "TIPO DIRECCION",
    code: "P16",
    icon: "ri-pin-distance-fill",
    link: "/cobranza/:urlIdentifier/tipo-direcciones",
  },
  {
    name: "AGREGAR TIPO DIRECCION",
    code: "P16-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR TIPO DIRECCION",
    code: "P16-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR TIPO DIRECCION",
    code: "P16-03",
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
      [Op.startsWith]: "P16",
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

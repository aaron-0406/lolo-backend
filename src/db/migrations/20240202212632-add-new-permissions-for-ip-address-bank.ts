import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "DIRECCIONES IP",
    code: "P14",
    icon: "ri-signal-tower-fill",
    link: "/:urlIdentifier/banco-direcciones-ip",
  },
  {
    name: "AGREGAR DIRECCION IP",
    code: "P14-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR ESTADO DIRECCION IP",
    code: "P14-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR DIRECCION IP",
    code: "P14-03",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR DIRECCION IP",
    code: "P14-04",
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

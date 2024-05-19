import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "NOTIFICACIONES PROGRAMADAS",
    code: "P28",
    icon: "ri-notification-2-fill",
    link: "/configuracion/:urlIdentifier/notificationes-programadas",
  },
  {
    name: "AGREGAR NOTIFICACION PROGRAMADA",
    code: "P28-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR NOTIFICACION PROGRAMADA",
    code: "P28-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR NOTIFICACION PROGRAMADA",
    code: "P28-03",
    icon: "-",
    link: "#",
  },
  {
    name: "ASIGNAR NOTIFICACION PROGRAMADA",
    code: "P28-04",
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
      [Op.startsWith]: ["P13-01-04", "P27"],
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

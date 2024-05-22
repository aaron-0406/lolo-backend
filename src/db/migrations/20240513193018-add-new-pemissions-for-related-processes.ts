import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "PROCESOS CONEXOS",
    code: "P13-01-05",
    icon: "ri-archive-drawer-line",
    link: "/judicial/:urlIdentifier/expediente/:code/procesos-conexos",
  },
  {
    name: "DETALLE PROCESO CONEXO",
    code: "P13-01-05-01",
    icon: "-",
    link: "/judicial/:urlIdentifier/expediente/:code/procesos-conexos/:relatedProcessCode",
  },
  {
    name: "AGREGAR PROCESO CONEXO",
    code: "P13-01-05-02",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR PROCESO CONEXO",
    code: "P13-01-05-03",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR PROCESO CONEXO",
    code: "P13-01-05-04",
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
      [Op.startsWith]: ["P13-01-05"],
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

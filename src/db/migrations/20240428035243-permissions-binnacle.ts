import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "BITACORA",
    code: "P13-01-01",
    icon: "-",
    link: "/judicial/:urlIdentifier/expediente/:code/bitacora",
  },
  {
    name: "AGREGAR BITACORA",
    code: "P13-01-01-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR BITACORA",
    code: "P13-01-01-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR BITACORA",
    code: "P13-01-01-03",
    icon: "-",
    link: "#",
  },
  {
    name: "ETAPA PROCEDIMENTAL",
    code: "P24",
    icon: "ri-book-2-fill",
    link: "/judicial/:urlIdentifier/etapa-procedimental",
  },
  {
    name: "CREAR ETAPA PROCEDIMENTAL",
    code: "P24-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR ETAPA PROCEDIMENTAL",
    code: "P24-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR ETAPA PROCEDIMENTAL",
    code: "P24-03",
    icon: "-",
    link: "#",
  },
  {
    name: "TIPO BITACORA",
    code: "P25",
    icon: "ri-book-2-fill",
    link: "/judicial/:urlIdentifier/tipo-bitacora",
  },
  {
    name: "CREAR TIPO BITACORA",
    code: "P25-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR TIPO BITACORA",
    code: "P25-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR TIPO BITACORA",
    code: "P25-03",
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
      [Op.startsWith]: ["P13-05", "P24", "P25"],
    },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

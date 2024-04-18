import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "JUZGADOS",
    code: "P20",
    icon: "ri-government-fill",
    link: "/judicial/:urlIdentifier/juzgados",
  },
  {
    name: "AGREGAR JUZGADO",
    code: "P20-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR JUZGADO",
    code: "P20-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR JUZGADO",
    code: "P20-03",
    icon: "-",
    link: "#",
  },
  {
    name: "MATERIAS",
    code: "P21",
    icon: "ri-book-marked-fill",
    link: "/judicial/:urlIdentifier/materias",
  },
  {
    name: "AGREGAR MATERIA",
    code: "P21-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR MATERIA",
    code: "P21-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR MATERIA",
    code: "P21-03",
    icon: "-",
    link: "#",
  },
  {
    name: "VIAS PROCEDIMENTALES",
    code: "P22",
    icon: "ri-cellphone-fill",
    link: "/judicial/:urlIdentifier/via-procedimental",
  },
  {
    name: "AGREGAR VIA PROCEDIMENTAL",
    code: "P22-01",
    icon: "-",
    link: "#",
  },
  {
    name: "EDITAR VIA PROCEDIMENTAL",
    code: "P22-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR VIA PROCEDIMENTAL",
    code: "P22-03",
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
      [Op.startsWith]: ["P20", "P21", "P22"],
    },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "TIPO CONTACTO",
    code: "P18",
    icon: "ri-contacts-fill",
    link: "/cobranza/:urlIdentifier/tipo-contacto",
  },
  {
    name: "AGREGAR TIPO CONTACTO",
    code: "P18-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR TIPO CONTACTO",
    code: "P18-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR TIPO CONTACTO",
    code: "P18-03",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE TIPO CONTACTOS",
    code: "P18-04",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR ESTADO DE CONTACTO",
    code: "P02-02-07-04",
    icon: "-",
    link: "#",
  },
];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
}

export async function down(queryInterface: QueryInterface) {
  const deleteCriteria = {
    [Op.or]: [
      {
        code: {
          [Op.startsWith]: "P18",
        },
      },
      {
        code: "P02-02-07-04",
      },
    ],
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

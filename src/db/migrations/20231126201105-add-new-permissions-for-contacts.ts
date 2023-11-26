import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "CONTACTOS",
    code: "P02-02-07",
    icon: "-",
    link: "/cobranza/:urlIdentifier/clientes/:code/contactos",
  },
  {
    name: "AGREGAR CONTACTO",
    code: "P02-02-07-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR CONTACTO",
    code: "P02-02-07-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR CONTACTO",
    code: "P02-02-07-03",
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
      [Op.startsWith]: "P02-02-07",
    },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

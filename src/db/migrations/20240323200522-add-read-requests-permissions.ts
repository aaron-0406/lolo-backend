import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "VER PERFIL",
    code: "P01-03",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE CLIENTES",
    code: "P02-06",
    icon: "-",
    link: "#",
  },
  {
    name: "VER DATOS CLIENTE",
    code: "P02-02-08",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE COMENTARIOS",
    code: "P02-02-01-04",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE ARCHIVOS",
    code: "P02-02-03-05",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE FIADORES",
    code: "P02-02-04-04",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE DIRECCIONES",
    code: "P02-02-05-04",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE PRODUCTOS",
    code: "P02-02-06-04",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE CONTACTOS",
    code: "P02-02-07-04",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE METAS",
    code: "P04-05",
    icon: "-",
    link: "#",
  },
  {
    name: "VER DATOS DE META",
    code: "P04-06",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE ACCIONES",
    code: "P07-04",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE FUNCIONARIOS",
    code: "P08-04",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE NEGOCIACIONES",
    code: "P09-04",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE USUARIOS",
    code: "P10-05",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE ROLES",
    code: "P11-04",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE AUDITORIA",
    code: "P12-01",
    icon: "-",
    link: "#",
  },
  {
    name: "VER LISTA DE ETIQUETAS",
    code: "P14-04",
    icon: "-",
    link: "#",
  },
];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
}

export async function down(queryInterface: QueryInterface) {
  const codesToDelete = newPermissions.map((permission) => permission.code);

  const deleteCriteria = {
    code: { [Op.in]: codesToDelete },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

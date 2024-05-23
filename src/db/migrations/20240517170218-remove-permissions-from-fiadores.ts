import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";
import rolePermissionModel from "../models/many-to-many/role-permission.model";

const { PERMISSION_TABLE } = permissionModel;
const { ROLE_PERMISSION_TABLE } = rolePermissionModel;

const removePermissions = [
  {
    name: "FIADORES",
    code: "P02-02-04",
    icon: "-",
    link: "#",
  },
  {
    name: "AGREGAR FIADOR",
    code: "P02-02-04-01",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR FIADOR",
    code: "P02-02-04-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR FIADOR",
    code: "P02-02-04-03",
    icon: "-",
    link: "#",
  },
];

const permissionIdsDelete = [75, 76, 77, 78];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkDelete(ROLE_PERMISSION_TABLE, {
    permission_id_permission: {
      [Op.in]: permissionIdsDelete,
    },
  });
  await queryInterface.bulkDelete(PERMISSION_TABLE, {
    [Op.or]: removePermissions,
  });
}

export async function down(queryInterface: QueryInterface) {
  const reincertPermission = [
    {
      name: "FIADORES",
      code: "P02-02-04",
      icon: "-",
      link: "#",
    },
    {
      name: "AGREGAR FIADOR",
      code: "P02-02-04-01",
      icon: "-",
      link: "#",
    },
    {
      name: "ACTUALIZAR FIADOR",
      code: "P02-02-04-02",
      icon: "-",
      link: "#",
    },
    {
      name: "ELIMINAR FIADOR",
      code: "P02-02-04-03",
      icon: "-",
      link: "#",
    },
  ];

  await queryInterface.bulkInsert(PERMISSION_TABLE, reincertPermission);
}

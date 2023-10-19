import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

export async function up(queryInterface: QueryInterface) {
  return queryInterface.bulkInsert(PERMISSION_TABLE, [
    {
      name: "EXPEDIENTES",
      code: "P13",
      icon: "ri-bank-fill",
      link: "/judicial/:urlIdentifier/expedientes",
    },
    {
      name: "DETALLES DEL EXPEDIENTE",
      code: "P13-01",
      icon: "-",
      link: "/judicial/:urlIdentifier/expedientes/:code",
    },
  ]);
}

export async function down(queryInterface: QueryInterface) {
  const deleteCriteria = {
    [Op.or]: [
      {
        name: "EXPEDIENTES",
        code: "P13",
        icon: "ri-bank-fill",
        link: "/judicial/:urlIdentifier/expedientes",
      },
      {
        name: "DETALLES DEL EXPEDIENTE",
        code: "P13-01",
        icon: "-",
        link: "/judicial/:urlIdentifier/expedientes/:code",
      },
    ],
  };
  return queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}

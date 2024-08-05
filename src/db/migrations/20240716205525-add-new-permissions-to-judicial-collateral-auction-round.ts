import { QueryInterface, Op, QueryTypes } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;
const newPermissions = [
  {
    name: "RONDAS DE REMATE",
    code: "P13-01-07",
    icon: "ri-auction-fill",
    link: "/judicial/:urlIdentifier/expediente/:code/rondas-de-remate",
  },
  {
    name: "RONDAS DE REMATE",
    code: "P13-01-06-01-04",
    icon: "ri-auction-fill",
    link: "/judicial/:urlIdentifier/expediente/:code/garantia/:collateralCode/rondas-de-remate",
  },
  {
    name: "DETALLE DE RONDA DE REMATE",
    code: "P13-01-06-01-04-01",
    icon: "-",
    link: "/judicial/:urlIdentifier/expediente/:code/garantia/:collateralCode/rondas-de-remate/:auctionCode",
  },
  {
    name: "AGREGAR RONDA DE REMATE",
    code: "P13-01-06-01-04-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ACTUALIZAR RONDA DE REMATE",
    code: "P13-01-06-01-04-03",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR RONDA DE REMATE",
    code: "P13-01-06-01-04-04",
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
      [Op.startsWith]: ["P13-01-07", "P13-01-06-01-04"],
    },
  };

  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
}
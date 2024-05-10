import { QueryInterface, Op } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "ESTATUS DEL PROCESO",
    code: "P13-01-04",
    icon: "ri-donut-chart-line",
    link: "/judicial/:urlIdentifier/expediente/:code/estatus-proceso",
  },
  {
    name: "GUARDAR ESTATUS DEL PROCESO",
    code: "P13-01-04-01",
    icon: "-",
    link: "#",
  }, 
  {
    name: "MOTIVO DEL PROCESO",
    code: "P27",
    link: "/judicial/:urlIdentifier/motivo-proceso",
    icon: "ri-layout-masonry-fill",
  }, 
  {
    name: "AGREGAR MOTIVO DEL PROCESO",
    code: "P27-01",
    icon: "-",
    link: "#",
  }, 
  {
    name: "EDITAR MOTIVO DEL PROCESO",
    code: "P27-02",
    icon: "-",
    link: "#",
  },
  {
    name: "ELIMINAR MOTIVO DEL PROCESO",
    code: "P27-03",
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

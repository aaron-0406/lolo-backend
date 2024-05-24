import { QueryInterface, Op, DataTypes, QueryTypes } from "sequelize";
import permissionModel from "../models/permission.model";

const { PERMISSION_TABLE } = permissionModel;

const newPermissions = [
  {
    name: "OPCIONES CLIENTE",
    code: "P30",
    icon: "ri-dropdown-list",
    link: "#",
    id_permission_main: 2,
    is_dropdown: true,
  },
  {
    name: "OPCIONES EXPEDIENTES",
    code: "P31",
    icon: "ri-dropdown-list",
    link: "#",
    id_permission_main: 60,
    is_dropdown: true,
  },
];

const updatePermissionsCustomers = [42, 46, 101, 105];
const updatePermissionsCaseFiles = [154, 141, 145, 159, 165];

export async function up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
  await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);

  const newIdCustomersOptionsResult = await queryInterface.sequelize.query(
    `SELECT id_permission FROM ${PERMISSION_TABLE} WHERE code = 'P30'`,
    { type: QueryTypes.SELECT }
  );

  const newIdCustomersOptions = Array.isArray(newIdCustomersOptionsResult) && newIdCustomersOptionsResult.length
    ? (newIdCustomersOptionsResult[0] as { id_permission: number }).id_permission
    : null;

  const newIdCaseFilesOptionsResult = await queryInterface.sequelize.query(
    `SELECT id_permission FROM ${PERMISSION_TABLE} WHERE code = 'P31'`,
    { type: QueryTypes.SELECT }
  );

  const newIdCaseFilesOptions = Array.isArray(newIdCaseFilesOptionsResult) && newIdCaseFilesOptionsResult.length
    ? (newIdCaseFilesOptionsResult[0] as { id_permission: number }).id_permission
    : null;

  if (newIdCustomersOptions !== null) {
    await queryInterface.bulkUpdate(
      PERMISSION_TABLE,
      { id_permission_main: newIdCustomersOptions },
      { id_permission: { [Op.in]: updatePermissionsCustomers } }
    );
  }

  if (newIdCaseFilesOptions !== null) {
    await queryInterface.bulkUpdate(
      PERMISSION_TABLE,
      { id_permission_main: newIdCaseFilesOptions },
      { id_permission: { [Op.in]: updatePermissionsCaseFiles } }
    );
  }
}

import { QueryInterface, DataTypes } from "sequelize";

import judicialCaseFileModel from "../models/judicial-case-file.model";

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel

export async function up(queryInterface: QueryInterface) {
  return queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "impulse_status", {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  });
}

export async function down(queryInterface: QueryInterface) {
  return queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "impulse_status");
}
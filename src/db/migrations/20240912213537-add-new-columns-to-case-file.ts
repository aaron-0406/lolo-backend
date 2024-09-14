import judicialCaseFileModel from "../models/judicial-case-file.model";
import { QueryInterface, DataTypes } from "sequelize";

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "comercial_value_soles", {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  });
  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "comercial_value_dollars", {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  });
  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "amount_affection_soles", {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  });
   await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "amount_affection_dollars", {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "comercial_value_soles");
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "comercial_value_dollars");
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "amount_affection_soles");
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "amount_affection_dollars");
}
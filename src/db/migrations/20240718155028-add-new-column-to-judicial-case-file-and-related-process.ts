import { DataTypes, QueryInterface } from "sequelize";
import judicialCaseFileModel from "../models/judicial-case-file.model";


const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "responsible_user_id", {
    allowNull: true,
    field: "responsible_user_id",
    type: DataTypes.INTEGER,
    defaultValue: 0,
  });
  await queryInterface.changeColumn(JUDICIAL_CASE_FILE_TABLE, "amount_demanded_soles", {
    type: DataTypes.DECIMAL(10, 2),
  })
  await queryInterface.changeColumn(JUDICIAL_CASE_FILE_TABLE, "amount_demanded_dollars", {
    type: DataTypes.DECIMAL(10, 2),
  })
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "responsible_user_id");
  await queryInterface.changeColumn(JUDICIAL_CASE_FILE_TABLE, "amount_demanded_soles", {
    type: DataTypes.DECIMAL(10, 3),
  })
  await queryInterface.changeColumn(JUDICIAL_CASE_FILE_TABLE, "amount_demanded_dollars", {
    type: DataTypes.DECIMAL(10, 3),
  })
}
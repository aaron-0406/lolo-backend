import { DataTypes, QueryInterface } from "sequelize";
import judicialCaseFileModel from "../models/judicial-case-file.model";

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "qr_code", {
    allowNull: true,
    field: "qr_code",
    type: DataTypes.TEXT("long"),
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "qr_code");
}


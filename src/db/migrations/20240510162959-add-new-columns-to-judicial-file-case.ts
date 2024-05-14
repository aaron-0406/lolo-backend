import { QueryInterface, DataTypes } from "sequelize";
import judicialCaseFileModel from "../models/judicial-case-file.model";
import judicialProcessReasonModel from "../models/judicial-process-reason.model";

const { JUDICIAL_PROCESS_REASON_TABLE } = judicialProcessReasonModel;
const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "process_reason_id", {
    allowNull: true,
    field: "process_reason_id",
    type: DataTypes.INTEGER,
    references: {
      model: JUDICIAL_PROCESS_REASON_TABLE,
      key: "id_judicial_process_status_reason",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "process_status", {
    allowNull: true,
    field: "process_status",
    type: DataTypes.STRING(150),
  });
  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "process_comment", {
    allowNull: true,
    field: "process_comment",
    type: DataTypes.TEXT("long"),
  });

}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "process_reason_id");
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "process_status");
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "process_comment");
}

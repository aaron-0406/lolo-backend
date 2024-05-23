import { QueryInterface, DataTypes } from "sequelize";
import judicialCaseFileModel from "../models/judicial-case-file.model";
import bankModel from "../models/bank.model";

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;
const { BANK_TABLE } = bankModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(
    JUDICIAL_CASE_FILE_TABLE,
    "id_judicial_case_file_related",
    {
      allowNull: true,
      field: "id_judicial_case_file_related",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_CASE_FILE_TABLE,
        key: "id_judicial_case_file",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    }
  );

  await queryInterface.addColumn(JUDICIAL_CASE_FILE_TABLE, "id_bank", {
    allowNull: true,
    field: "id_bank",
    type: DataTypes.INTEGER,
    references: {
      model: BANK_TABLE,
      key: "id_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(
    JUDICIAL_CASE_FILE_TABLE,
    "id_judicial_case_file_related"
  );
  await queryInterface.removeColumn(JUDICIAL_CASE_FILE_TABLE, "id_bank");
}

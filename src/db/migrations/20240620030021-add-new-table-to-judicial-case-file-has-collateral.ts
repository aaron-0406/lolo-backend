import { DataTypes, QueryInterface } from "sequelize";

import judicialCaseFileHasCollateralModel from "../models/judicial-case-file-has-collateral.model";
import judicialCollateralModel from "../models/judicial-collateral.model";
import judicialCaseFileModel from "../models/judicial-case-file.model";

const { JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE } = judicialCaseFileHasCollateralModel;
const { JUDICIAL_COLLATERAL_TABLE } = judicialCollateralModel;
const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export async function up (queryInterface: QueryInterface) {
  await queryInterface.createTable(JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_case_file_has_collateral",
      type: DataTypes.INTEGER,
    },
    judicialCaseFileId: {
      allowNull: false,
      field: "judicial_case_file_id",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_CASE_FILE_TABLE,
        key: "id_judicial_case_file",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    judicialCollateralId: {
      allowNull: false,
      field: "judicial_collateral_id",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_COLLATERAL_TABLE,
        key: "id_judicial_collateral",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    createdAt: {
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      field: "deleted_at",
      type: DataTypes.DATE,
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE);
}
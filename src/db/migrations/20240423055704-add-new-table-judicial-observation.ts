import { DataTypes, QueryInterface } from "sequelize";
import judicialObsTypeModel from "../models/judicial-obs-type.model";
import judicialObservationModel from "../models/judicial-observation.model";
import judicialCaseFileModel from "../models/judicial-case-file.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { JUDICIAL_OBSERVATION_TABLE } = judicialObservationModel;
const { JUDICIAL_OBS_TYPE_TABLE } = judicialObsTypeModel;
const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(JUDICIAL_OBSERVATION_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_observation",
      type: DataTypes.INTEGER,
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT("long"),
    },
    judicialCaseFileId: {
      allowNull: false,
      field: "judicial_case_file_id_judicial_case_file",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_CASE_FILE_TABLE,
        key: "id_judicial_case_file",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    judicialObsTypeId: {
      allowNull: false,
      field: "judicial_obs_type_id_judicial_obs_type",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_OBS_TYPE_TABLE,
        key: "id_judicial_obs_type",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    customerHasBankId: {
      allowNull: false,
      field: "customer_has_bank_id_customer_has_bank",
      type: DataTypes.INTEGER,
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
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
  await queryInterface.dropTable(JUDICIAL_OBSERVATION_TABLE);
}

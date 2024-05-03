import { DataTypes, QueryInterface } from "sequelize";
import judicialObsFileModel from "../models/judicial-obs-file.model";
import judicialObservationModel from "../models/judicial-observation.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { JUDICIAL_OBS_FILE_TABLE } = judicialObsFileModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { JUDICIAL_OBSERVATION_TABLE } = judicialObservationModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(JUDICIAL_OBS_FILE_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_obs_file",
      type: DataTypes.INTEGER,
    },
    awsName: {
      allowNull: false,
      field: "aws_name",
      type: DataTypes.TEXT("long"),
    },
    originalName: {
      allowNull: false,
      field: "original_name",
      type: DataTypes.TEXT("long"),
    },
    judicialObservationId: {
      allowNull: false,
      field: "judicial_observation_id_judicial_observation",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_OBSERVATION_TABLE,
        key: "id_judicial_observation",
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
  await queryInterface.dropTable(JUDICIAL_OBS_FILE_TABLE);
}

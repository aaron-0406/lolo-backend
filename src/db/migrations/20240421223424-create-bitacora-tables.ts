import { DataTypes, QueryInterface } from "sequelize";
import judicialBinnacleModel from "../models/judicial-binnacle.model";
("../models/judicial-binnacle.model");
import judicialBinProceduralStageModel from "../models/judicial-bin-procedural-stage.model";
("../models/judicial-bin-procedural-stage.model");
import judicialBinTypeBinnacleModel from "../models/judicial-bin-type-binnacle.model";
import judicialBinFileModel from "../models/judicial-bin-file.model";
import judicialCaseFileModel from "../models/judicial-case-file.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel;
const { JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE } = judicialBinProceduralStageModel;
const { JUDICIAL_BIN_TYPE_BINNACLE_TABLE } = judicialBinTypeBinnacleModel;
const { JUDICIAL_BIN_FILE } = judicialBinFileModel;
const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(JUDICIAL_BIN_TYPE_BINNACLE_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_bin_type_binnacle",
      type: DataTypes.INTEGER,
    },
    typeBinnacle: {
      allowNull: false,
      field: "type_binnacle",
      type: DataTypes.STRING(150),
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "deleted_at",
    },
    customerHasBankId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "customer_has_bank_id_customer_has_bank",
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
    },
  });

  await queryInterface.createTable(JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_bin_procedural_stage",
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
    proceduralStage: {
      allowNull: false,
      field: "procedural_stage",
      type: DataTypes.STRING(150),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "deleted_at",
    },
    customerHasBankId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "customer_has_bank_id_customer_has_bank",
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
    },
  });

  await queryInterface.createTable(JUDICIAL_BINNACLE_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_binnacle",
      type: DataTypes.INTEGER,
    },
    binnacleTypeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "type_binnacle_id_type_binnacle",
      references: {
        model: JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
        key: "id_judicial_bin_type_binnacle",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "deleted_at",
    },
    customerHasBankId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "customer_has_bank_id_customer_has_bank",
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "date",
    },
    judicialBinProceduralStageId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
        key: "id_judicial_bin_procedural_stage",
      },
      field: "judicial_bin_procedural_stage_id_judicial_bin_procedural_stage",
    },

    judicialFileCaseId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "judicial_file_case_id_judicial_file_case",
      references: {
        model: JUDICIAL_CASE_FILE_TABLE,
        key: "id_judicial_case_file",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },

    lastPerformed: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "last_performed",
    },
  });

  await queryInterface.createTable(JUDICIAL_BIN_FILE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_bin_file",
      type: DataTypes.INTEGER,
    },
    judicialBinnacleId: {
      allowNull: false,
      field: "judicial_binnacle_id_judicial_binnacle",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_BINNACLE_TABLE,
        key: "id_judicial_binnacle",
      },
    },
    nameOriginAws: {
      allowNull: false,
      field: "name_origin_aws",
      type: DataTypes.STRING,
    },
    originalName: {
      allowNull: false,
      field: "original_name",
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "deleted_at",
    },
    customerHasBankId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "customer_has_bank_id_customer_has_bank",
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(JUDICIAL_BIN_FILE);
  await queryInterface.dropTable(JUDICIAL_BINNACLE_TABLE);
  await queryInterface.dropTable(JUDICIAL_BIN_TYPE_BINNACLE_TABLE);
  await queryInterface.dropTable(JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE);
}

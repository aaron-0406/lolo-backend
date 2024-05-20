import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialBinnacleType } from "../../app/judicial/types/judicial-binnacle.type";
import judicialCaseFileModel from "./judicial-case-file.model";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";
import judicialBinProceduralStageModel from "./judicial-bin-procedural-stage.model";
import judicialBinTypeBinnacleModel from "./judicial-bin-type-binnacle.model";
import judicialBinDefendantProceduralActionModel from "./judicial-bin-defendant-procedural-action.model";

const JUDICIAL_BINNACLE_TABLE = "JUDICIAL_BINNACLE";

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;
const { JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE } = judicialBinProceduralStageModel;
const { JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE } =
  judicialBinDefendantProceduralActionModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { JUDICIAL_BIN_TYPE_BINNACLE_TABLE } = judicialBinTypeBinnacleModel;

const JudicialBinnacleSchema: ModelAttributes<
  JudicialBinnacle,
  JudicialBinnacleType
> = {
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
    defaultValue: DataTypes.NOW,
    field: "created_at",
  },

  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "updated_at",
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
};

class JudicialBinnacle extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.hasOne(models.JUDICIAL_CASE_FILE, {
      as: "judicialCaseFile",
      foreignKey: "id_judicial_case_file",
    });
    this.hasMany(models.JUDICIAL_BIN_FILE, {
      as: "judicialBinFiles",
      foreignKey: "judicialBinnacleId",
    });
    this.belongsTo(models.JUDICIAL_BIN_TYPE_BINNACLE, { as: "binnacleType" });
    this.belongsTo(models.JUDICIAL_BIN_PROCEDURAL_STAGE, {
      as: "judicialBinProceduralStage",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_BINNACLE_TABLE,
      modelName: JUDICIAL_BINNACLE_TABLE,
      timestamps: true,
      paranoid: true,
      deleteAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_BINNACLE_TABLE,
  JudicialBinnacleSchema,
  JudicialBinnacle,
};

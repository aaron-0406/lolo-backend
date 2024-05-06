import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialBinProceduralStageType } from "../../app/judicial/types/judicial-bin-procedural-stage.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE = "JUDICIAL_BIN_PROCEDURAL_STAGE";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialBinProceduralStageSchema: ModelAttributes<
  JudicialBinProceduralStage,
  JudicialBinProceduralStageType
> = {
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
};

class JudicialBinProceduralStage extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
      modelName: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
      timestamps: true,
      paranoid: true,
      deleteAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
  JudicialBinProceduralStageSchema,
  JudicialBinProceduralStage,
};

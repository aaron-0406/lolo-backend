import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialBinDefendantProceduralActionType } from "../../app/judicial/types/judicial-bin-defendant-procedural-action.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE =
  "JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialBinDefendantProceduralActionSchema: ModelAttributes<
  JudicialBinDefendantProceduralAction,
  JudicialBinDefendantProceduralActionType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_defendant_procedural_action",
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: DataTypes.NOW,
  },
  defendantProceduralAction: {
    allowNull: false,
    field: "defendant_procedural_action",
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

class JudicialBinDefendantProceduralAction extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE,
      modelName: JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE,
      timestamps: true,
      paranoid: true,
      deleteAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_BIN_DEFENDANT_PROCEDURAL_ACTION_TABLE,
  JudicialBinDefendantProceduralActionSchema,
  JudicialBinDefendantProceduralAction,
};

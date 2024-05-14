import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialProcessReasonType } from "../../app/judicial/types/judicial-process-reason.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_PROCESS_REASON_TABLE = "JUDICIAL_PROCESS_REASON";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialProcessReasonSchema: ModelAttributes<
  JudicialProcessReason,
  JudicialProcessReasonType
> = {
  id: {
    primaryKey: true,
    allowNull: true,
    autoIncrement: true,
    field: "id_judicial_process_status_reason",
    type: DataTypes.INTEGER,
  },
  reason: {
    allowNull: false,
    type: DataTypes.STRING(150),
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
};

class JudicialProcessReason extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.hasMany(models.JUDICIAL_CASE_FILE, {
      as: "judicialCaseFile",
      foreignKey: "processReasonId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_PROCESS_REASON_TABLE,
      modelName: JUDICIAL_PROCESS_REASON_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_PROCESS_REASON_TABLE,
  JudicialProcessReasonSchema,
  JudicialProcessReason,
};

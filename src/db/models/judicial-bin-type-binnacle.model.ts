import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";
import { JudicialBinTypeBinnacleType } from "../../app/judicial/types/judicial-bin-type-binnacle.type";

const JUDICIAL_BIN_TYPE_BINNACLE_TABLE = "JUDICIAL_BIN_TYPE_BINNACLE";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialBinTypeBinnacleSchema: ModelAttributes<
  JudicialBinTypeBinnacle,
  JudicialBinTypeBinnacleType
> = {
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
};

class JudicialBinTypeBinnacle extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
      modelName: JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
      timestamps: true,
      paranoid: true,
      deleteAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_BIN_TYPE_BINNACLE_TABLE,
  JudicialBinTypeBinnacleSchema,
  JudicialBinTypeBinnacle,
};

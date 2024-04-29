import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialBinFileType } from "../../app/judicial/types/judicial-bin-file.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";
import judicialBinnacleModel from "./judicial-binnacle.model";

const JUDICIAL_BIN_FILE = "JUDICIAL_BIN_FILE";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel;

const JudicialBinFileSchema: ModelAttributes<
  JudicialBinFile,
  JudicialBinFileType
> = {
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
};

class JudicialBinFile extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.JUDICIAL_BINNACLE, {
      as: "judicialBinnacle",
      foreignKey: "judicialBinnacleId",
    });
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_BIN_FILE,
      modelName: JUDICIAL_BIN_FILE,
      timestamps: false,
      paranoid: true,
      deleteAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_BIN_FILE,
  JudicialBinFileSchema,
  JudicialBinFile,
};

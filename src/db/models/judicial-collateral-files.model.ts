import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { JudicialCollateralFilesType } from "../../app/judicial/types/judicial-collateral-files.type";
import judicialCollateralModel from "./judicial-collateral.model";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_COLLATERAL_FILES_TABLE = "JUDICIAL_COLLATERAL_FILES";
const { JUDICIAL_COLLATERAL_TABLE } = judicialCollateralModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialCollateralFilesSchema: ModelAttributes<
  JudicialCollateralFiles,
  JudicialCollateralFilesType
> = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: "id_judicial_collateral_files",
  },
  nameOriginAws: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
    field: "name_origin_aws",
  },
  originalName: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
    field: "original_name",
  },
  judicialCollateralIdJudicialCollateral: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "judicial_collateral_id_judicial_collateral",
    references: {
      model: JUDICIAL_COLLATERAL_TABLE,
      key: "id_judicial_collateral",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  customerHasBankIdCustomerHasBank: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "customer_has_bank_id_customer_has_bank",
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
}

class JudicialCollateralFiles extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.JUDICIAL_COLLATERAL, { as: "judicialCollateral" });
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_COLLATERAL_FILES_TABLE,
      modelName: JUDICIAL_COLLATERAL_FILES_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_COLLATERAL_FILES_TABLE,
  JudicialCollateralFilesSchema,
  JudicialCollateralFiles,
};
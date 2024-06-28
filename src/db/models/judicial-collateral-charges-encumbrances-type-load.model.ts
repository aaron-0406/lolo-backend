import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { JudicialCollateralChargesEncumbrancesTypeLoadType } from "../../app/judicial/types/judicial-collateral-charges-encumbrances-type-load.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE = "JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD"
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialCollateralChargesEncumbrancesTypeLoadSchema: ModelAttributes<
  JudicialCollateralChargesEncumbrancesTypeLoad,
  JudicialCollateralChargesEncumbrancesTypeLoadType
> = {
  id: {
    type: DataTypes.INTEGER,
    field: "id_judicial_collateral_charges_encumbrances_type_load",
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: "name",
  },
  customerHasBankId: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: "customer_has_bank_id_customer_has_bank",
    references: {
      model: CUSTOMER_HAS_BANK_TABLE,
      key: "id_customer_has_bank",
    }
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

class JudicialCollateralChargesEncumbrancesTypeLoad extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.hasMany(models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES, {
      as: "judicialCollateralChargesEncumbrance",
      foreignKey: "idTypeOfLoad",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
      modelName: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
  JudicialCollateralChargesEncumbrancesTypeLoadSchema,
  JudicialCollateralChargesEncumbrancesTypeLoad,
};

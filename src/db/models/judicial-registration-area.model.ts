import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { JudicialRegistrationAreaType } from "../../app/judicial/types/judicial-registration-area.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_REGISTRATION_AREA_TABLE = "JUDICIAL_REGISTRATION_AREA";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialRegistrationAreaSchema: ModelAttributes<
  JudicialRegistrationArea,
  JudicialRegistrationAreaType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_judicial_registration_area",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(200),
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

class JudicialRegistrationArea extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.hasMany(models.JUDICIAL_COLLATERAL, {
      as: "judicialCollateral",
      foreignKey: "registrationAreaId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_REGISTRATION_AREA_TABLE,
      modelName: JUDICIAL_REGISTRATION_AREA_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  JudicialRegistrationArea,
  JudicialRegistrationAreaSchema,
  JUDICIAL_REGISTRATION_AREA_TABLE,
};

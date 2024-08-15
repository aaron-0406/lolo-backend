import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { TariffType } from "../../app/settings/types/tariff.type";

const TARIFF_TABLE = "TARIFF";

const TariffSchema: ModelAttributes<Tariff, TariffType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_tariff",
    type: DataTypes.INTEGER,
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
  code: {
    allowNull: false,
    type: DataTypes.TEXT("long"),
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
};

class Tariff extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.hasMany(models.TARIFF_INTERVAL_MATCH, {
      as: "tariffIntervalMatch",
      foreignKey: "tariffId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TARIFF_TABLE,
      modelName: TARIFF_TABLE,
      timestamps: false,
    };
  }
}

export default {
  TARIFF_TABLE,
  TariffSchema,
  Tariff,
};
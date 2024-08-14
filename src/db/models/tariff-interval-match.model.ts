import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";

import { TariffIntervalMatchType } from "../../app/settings/types/tariff-interval-match.type";
import tariffIntervalModel from "./tariff-interval.model";
import tariffModel from "./tariff.model";

const TARIFF_INTERVAL_MATCH_TABLE = "TARIFF_INTERVAL_MATCH";

const TariffIntervalMatchSchema: ModelAttributes<TariffIntervalMatch, TariffIntervalMatchType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_tariff_interval_match",
    type: DataTypes.INTEGER,
  },
  tariffId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: tariffModel.TARIFF_TABLE,
      key: "id_tariff",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  intervalId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: tariffIntervalModel.TARIFF_INTERVAL_TABLE,
      key: "id_tariff_interval",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  value: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2),
  },
};

class TariffIntervalMatch extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.TARIFF_INTERVAL,{
      foreignKey: "intervalId",
      as: "interval",
    })
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TARIFF_INTERVAL_MATCH_TABLE,
      modelName: TARIFF_INTERVAL_MATCH_TABLE,
      timestamps: false,
    };
  }
}

export default {
  TARIFF_INTERVAL_MATCH_TABLE,
  TariffIntervalMatchSchema,
  TariffIntervalMatch,
};
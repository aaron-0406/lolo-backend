import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { TariffIntervalType } from "../../app/settings/types/tariff-interval.type";

const TARIFF_INTERVAL_TABLE = "TARIFF_INTERVAL";

const TariffIntervalSchema: ModelAttributes<TariffInterval, TariffIntervalType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_tariff_interval",
    type: DataTypes.INTEGER,
  },
  description:{
    allowNull: false,
    type: DataTypes.TEXT("long"),
  },
  interval: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  intervalDescription: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
};

class TariffInterval extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.hasMany(models.TARIFF_INTERVAL_MATCH, {
      foreignKey: "intervalId",
      sourceKey: "id",
      as: "tariffIntervalMatch",
    });
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TARIFF_INTERVAL_TABLE,
      modelName: TARIFF_INTERVAL_TABLE,
      timestamps: false,
    };
  }
}
export default {
  TARIFF_INTERVAL_TABLE,
  TariffIntervalSchema,
  TariffInterval,
};
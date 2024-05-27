import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { CityType } from "../../app/dash/types/city.type";
import customerModel from "./customer.model";

const CITY_TABLE = "CITY";
const { CUSTOMER_TABLE } = customerModel;

const CitySchema: ModelAttributes<City, CityType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_city",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    field: "name",
    type: DataTypes.STRING(50),
  },
  customerId: {
    allowNull: false,
    field: "customer_id_customer",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class City extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER, { as: "customer" });

    this.hasMany(models.CLIENT, {
      as: "client",
      foreignKey: "cityId",
    });

    this.hasMany(models.CLIENT, {
      as: "judicialCaseFile",
      foreignKey: "cityId",
    });

    this.hasMany(models.JUDICIAL_COURT, {
      as: "judicialCourt",
      foreignKey: "cityId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CITY_TABLE,
      modelName: CITY_TABLE,
      timestamps: false,
    };
  }
}

export default { CITY_TABLE, CitySchema, City };

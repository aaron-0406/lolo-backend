import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { CityType } from "../../app/dash/types/city.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const CITY_TABLE = "CITY";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

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
  customerHasBankId: {
    allowNull: false,
    field: "customer_has_bank_id",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_HAS_BANK_TABLE,
      key: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class City extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });

    this.hasMany(models.CLIENT, {
      as: "client",
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

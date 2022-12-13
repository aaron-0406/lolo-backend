import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
import { CityType } from "../../app/boss/types/city.type";

const CITY_TABLE = "CITY";

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
};

class City extends Model {
  static associate() {
    //associate
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

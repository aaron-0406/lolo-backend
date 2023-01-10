"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const CITY_TABLE = "CITY";
const CitySchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_city",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        field: "name",
        type: sequelize_1.DataTypes.STRING(50),
    },
};
class City extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.CLIENT, {
            as: "client",
            foreignKey: "cityId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CITY_TABLE,
            modelName: CITY_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { CITY_TABLE, CitySchema, City };

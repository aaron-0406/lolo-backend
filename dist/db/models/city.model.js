"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_model_1 = __importDefault(require("./customer.model"));
const CITY_TABLE = "CITY";
const { CUSTOMER_TABLE } = customer_model_1.default;
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
    customerId: {
        allowNull: false,
        field: "customer_id_customer",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: "id_customer",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
};
class City extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER, { as: "customer" });
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

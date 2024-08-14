"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const tariff_interval_model_1 = __importDefault(require("./tariff-interval.model"));
const tariff_model_1 = __importDefault(require("./tariff.model"));
const TARIFF_INTERVAL_MATCH_TABLE = "TARIFF_INTERVAL_MATCH";
const TariffIntervalMatchSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_tariff_interval_match",
        type: sequelize_1.DataTypes.INTEGER,
    },
    tariffId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tariff_model_1.default.TARIFF_TABLE,
            key: "id_tariff",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    intervalId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tariff_interval_model_1.default.TARIFF_INTERVAL_TABLE,
            key: "id_tariff_interval",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    value: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
    },
};
class TariffIntervalMatch extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.TARIFF_INTERVAL, {
            foreignKey: "intervalId",
            as: "interval",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: TARIFF_INTERVAL_MATCH_TABLE,
            modelName: TARIFF_INTERVAL_MATCH_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    TARIFF_INTERVAL_MATCH_TABLE,
    TariffIntervalMatchSchema,
    TariffIntervalMatch,
};

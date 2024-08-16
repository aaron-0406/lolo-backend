"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TARIFF_INTERVAL_TABLE = "TARIFF_INTERVAL";
const TariffIntervalSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_tariff_interval",
        type: sequelize_1.DataTypes.INTEGER,
    },
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT("long"),
    },
    interval: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
    },
    intervalDescription: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
    },
};
class TariffInterval extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.TARIFF_INTERVAL_MATCH, {
            foreignKey: "intervalId",
            sourceKey: "id",
            as: "tariffIntervalMatch",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: TARIFF_INTERVAL_TABLE,
            modelName: TARIFF_INTERVAL_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    TARIFF_INTERVAL_TABLE,
    TariffIntervalSchema,
    TariffInterval,
};

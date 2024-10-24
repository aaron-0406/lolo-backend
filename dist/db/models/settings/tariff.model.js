"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TARIFF_TABLE = "TARIFF";
const TariffSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_tariff",
        type: sequelize_1.DataTypes.INTEGER,
    },
    type: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(255),
    },
    customerHasBankId: {
        field: "customer_has_bank_id_customer_has_bank",
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    code: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT("long"),
    },
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(255),
    },
};
class Tariff extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.TARIFF_INTERVAL_MATCH, {
            as: "tariffIntervalMatch",
            foreignKey: "tariffId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: TARIFF_TABLE,
            modelName: TARIFF_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    TARIFF_TABLE,
    TariffSchema,
    Tariff,
};

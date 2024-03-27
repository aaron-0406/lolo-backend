"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DASH_IP_ADDRESS_BANK_TABLE = "DASH_IP_ADDRESS_BANK";
const DashIpAddressBankSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_dash_ip_address_bank",
        type: sequelize_1.DataTypes.INTEGER,
    },
    addressName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
    },
    ip: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    state: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT({ length: 1 }),
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        field: "updated_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    deletedAt: {
        allowNull: true,
        field: "deleted_at",
        type: sequelize_1.DataTypes.DATE,
    },
};
class DashIpAddressBank extends sequelize_1.Model {
    static associate(models) { }
    static config(sequelize) {
        return {
            sequelize,
            tableName: DASH_IP_ADDRESS_BANK_TABLE,
            modelName: DASH_IP_ADDRESS_BANK_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    DASH_IP_ADDRESS_BANK_TABLE,
    DashIpAddressBankSchema,
    DashIpAddressBank,
};

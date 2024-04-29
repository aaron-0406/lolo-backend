"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_model_1 = __importDefault(require("./customer.model"));
const EXT_IP_ADDRESS_BANK_TABLE = "EXT_IP_ADDRESS_BANK";
const ExtIpAddressBankSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_ext_ip_address_bank",
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
    customerId: {
        allowNull: false,
        field: "customer_id_customer",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: customer_model_1.default.CUSTOMER_TABLE,
            key: "id_customer",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
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
class ExtIpAddressBank extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER, { as: "customer" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: EXT_IP_ADDRESS_BANK_TABLE,
            modelName: EXT_IP_ADDRESS_BANK_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    EXT_IP_ADDRESS_BANK_TABLE,
    ExtIpAddressBankSchema,
    ExtIpAddressBank,
};

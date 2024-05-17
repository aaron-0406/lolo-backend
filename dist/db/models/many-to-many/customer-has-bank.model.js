"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_model_1 = __importDefault(require("../customer.model"));
const bank_model_1 = __importDefault(require("../bank.model"));
const { BANK_TABLE } = bank_model_1.default;
const { CUSTOMER_TABLE } = customer_model_1.default;
const CUSTOMER_HAS_BANK_TABLE = "CUSTOMER_HAS_BANK";
const CustomerHasBankSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_customer_has_bank",
        type: sequelize_1.DataTypes.INTEGER,
    },
    idCustomer: {
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
    idBank: {
        allowNull: false,
        field: "bank_id_bank",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: BANK_TABLE,
            key: "id_bank",
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
};
class CustomerHasBank extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.CLIENT, {
            as: "client",
            foreignKey: "customerHasBankId",
        });
        this.hasMany(models.MANAGEMENT_ACTION, {
            as: "managementAction",
            foreignKey: "customerHasBankId",
        });
        this.hasMany(models.NEGOTIATION, {
            as: "negotiation",
            foreignKey: "customerHasBankId",
        });
        this.hasMany(models.EXT_CONTACT_TYPE, {
            as: "extContactType",
            foreignKey: "customerHasBankId",
        });
        this.hasMany(models.EXT_PRODUCT_NAME, {
            as: "extProductName",
            foreignKey: "customerHasBankId",
        });
        this.belongsTo(models.BANK, { as: "bank", foreignKey: "idBank" });
        this.hasMany(models.SCHELUDED_NOTIFICATIONS_USERS, {
            as: 'scheduledNotifications',
            foreignKey: 'customerHasBankId',
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_HAS_BANK_TABLE,
            modelName: CUSTOMER_HAS_BANK_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    CUSTOMER_HAS_BANK_TABLE,
    CustomerHasBankSchema,
    CustomerHasBank,
};

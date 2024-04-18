"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const city_model_1 = __importDefault(require("./city.model"));
const funcionario_model_1 = __importDefault(require("./funcionario.model"));
const customer_user_model_1 = __importDefault(require("./customer-user.model"));
const negotiation_model_1 = __importDefault(require("./negotiation.model"));
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const CLIENT_TABLE = "CLIENT";
const ClientSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_client",
        type: sequelize_1.DataTypes.INTEGER,
    },
    code: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING(150),
    },
    negotiationId: {
        allowNull: false,
        field: "negotiation_id_negotiation",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: negotiation_model_1.default.NEGOTIATION_TABLE,
            key: "id_negotiation",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    dniOrRuc: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(20),
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
    },
    salePerimeter: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT("tiny"),
    },
    phone: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT("tiny"),
    },
    email: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT("tiny"),
    },
    chbTransferred: {
        allowNull: true,
        field: "chb_transferred",
        type: sequelize_1.DataTypes.INTEGER,
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    cityId: {
        allowNull: false,
        field: "city_id_city",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: city_model_1.default.CITY_TABLE,
            key: "id_city",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    funcionarioId: {
        allowNull: false,
        field: "funcionario_id_funcionario",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: funcionario_model_1.default.FUNCIONARIO_TABLE,
            key: "id_funcionario",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    customerUserId: {
        allowNull: false,
        field: "customer_user_id_customer_user",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: customer_user_model_1.default.CUSTOMER_USER_TABLE,
            key: "id_customer_user",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    customerHasBankId: {
        allowNull: false,
        field: "customer_has_bank_id_customer_has_bank",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: customer_has_bank_model_1.default.CUSTOMER_HAS_BANK_TABLE,
            key: "id_customer_has_bank",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
};
class Client extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CITY, { as: "city" });
        this.belongsTo(models.FUNCIONARIO, { as: "funcionario" });
        this.belongsTo(models.NEGOTIATION, { as: "negotiation" });
        this.belongsTo(models.CUSTOMER_USER, { as: "customerUser" });
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.hasMany(models.COMMENT, {
            as: "comment",
            foreignKey: "clientId",
        });
        this.hasMany(models.EXT_CONTACT, {
            as: "extContacts",
            foreignKey: "clientId",
        });
        this.hasMany(models.FILE, {
            as: "files",
            foreignKey: "clientId",
        });
        this.hasMany(models.GUARANTOR, {
            as: "guarantor",
            foreignKey: "clientId",
        });
        this.hasMany(models.DIRECTION, {
            as: "direction",
            foreignKey: "clientId",
        });
        this.hasMany(models.PRODUCT, {
            as: "product",
            foreignKey: "code",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CLIENT_TABLE,
            modelName: CLIENT_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { CLIENT_TABLE, ClientSchema, Client };

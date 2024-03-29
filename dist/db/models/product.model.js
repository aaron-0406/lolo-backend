"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const client_model_1 = __importDefault(require("./client.model"));
const customer_model_1 = __importDefault(require("./customer.model"));
const PRODUCT_TABLE = "PRODUCT";
const ProductSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_product",
        type: sequelize_1.DataTypes.INTEGER,
    },
    code: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    state: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    clientCode: {
        allowNull: false,
        field: "client_code_client",
        type: sequelize_1.DataTypes.STRING(150),
        references: {
            model: client_model_1.default.CLIENT_TABLE,
            key: "code",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
        onDelete: "CASCADE",
    },
};
class Product extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER, { as: "customer" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: PRODUCT_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { PRODUCT_TABLE, ProductSchema, Product };

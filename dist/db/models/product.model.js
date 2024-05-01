"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const client_model_1 = __importDefault(require("./client.model"));
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const customer_model_1 = __importDefault(require("./customer.model"));
const negotiation_model_1 = __importDefault(require("./negotiation.model"));
const ext_product_name_model_1 = __importDefault(require("./ext-product-name.model"));
const judicial_case_file_model_1 = __importDefault(require("../models/judicial-case-file.model"));
const PRODUCT_TABLE = "PRODUCT";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { EXT_PRODUCT_NAME_TABLE } = ext_product_name_model_1.default;
const { JUDICIAL_CASE_FILE_TABLE } = judicial_case_file_model_1.default;
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
    clientId: {
        allowNull: false,
        field: "client_id",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: client_model_1.default.CLIENT_TABLE,
            key: "id_client",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
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
    negotiationId: {
        allowNull: true,
        field: "negotiation_id_negotiation",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: negotiation_model_1.default.NEGOTIATION_TABLE,
            key: "id_negotiation",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    customerHasBankId: {
        allowNull: false,
        field: "customer_has_bank_id_customer_has_bank",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: CUSTOMER_HAS_BANK_TABLE,
            key: "id_customer_has_bank",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    extProductNameId: {
        allowNull: true,
        field: "ext_product_name_id_ext_product_name",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: EXT_PRODUCT_NAME_TABLE,
            key: "id_ext_product_name",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    judicialCaseFileId: {
        allowNull: true,
        field: "judicial_case_file_id_judicial_case_file",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: JUDICIAL_CASE_FILE_TABLE,
            key: "id_judicial_case_file",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
};
class Product extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CLIENT, { as: "client" });
        this.belongsTo(models.CUSTOMER, { as: "customer" });
        this.belongsTo(models.NEGOTIATION, { as: "negotiation" });
        this.belongsTo(models.EXT_PRODUCT_NAME, { as: "extProductName" });
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.belongsTo(models.JUDICIAL_CASE_FILE, { as: "judicialCaseFile" });
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

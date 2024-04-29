"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_model_1 = __importDefault(require("./customer.model"));
const TEMPLATE_TABLE = "TEMPLATE";
const TemplateSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_template",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    templateJson: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    templatePhoto: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
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
};
class Template extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER, { as: "customer" });
        this.hasMany(models.TEMPLATE_HAS_VALUES, {
            as: "template_has_values",
            foreignKey: "templateId",
            onDelete: "NO ACTION",
            onUpdate: "CASCADE",
        });
        this.hasMany(models.TEMPLATE_IMG, {
            as: "template_imgs",
            foreignKey: "templateId",
            onDelete: "NO ACTION",
            onUpdate: "CASCADE",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: TEMPLATE_TABLE,
            modelName: TEMPLATE_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { TEMPLATE_TABLE, TemplateSchema, Template };

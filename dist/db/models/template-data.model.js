"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const template_model_1 = __importDefault(require("./template.model"));
const ecampo_model_1 = __importDefault(require("./ecampo.model"));
const TEMPLATE_DATA_TABLE = "TEMPLATE_DATA";
const TemplateDataSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_template_data",
        type: sequelize_1.DataTypes.INTEGER,
    },
    value: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    templateId: {
        allowNull: false,
        field: "template_id_template",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: template_model_1.default.TEMPLATE_TABLE,
            key: "id_template",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    ecampoId: {
        allowNull: false,
        field: "ecampo_id_ecampo",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: ecampo_model_1.default.ECAMPO_TABLE,
            key: "id_ecampo",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
};
class TemplateData extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.TEMPLATE, { as: "template" });
        this.belongsTo(models.ECAMPO, { as: "ecampo" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: TEMPLATE_DATA_TABLE,
            modelName: TEMPLATE_DATA_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { TEMPLATE_DATA_TABLE, TemplateDataSchema, TemplateData };

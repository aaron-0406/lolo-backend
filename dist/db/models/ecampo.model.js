"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const template_model_1 = __importDefault(require("./template.model"));
const ECAMPO_TABLE = "ECAMPO";
const ECampoSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_ecampo",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    field: {
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
        onDelete: "NO ACTION",
    },
};
class ECampo extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.TEMPLATE, { as: "template" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: ECAMPO_TABLE,
            modelName: ECAMPO_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { ECAMPO_TABLE, ECampoSchema, ECampo };

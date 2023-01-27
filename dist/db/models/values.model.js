"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const template_has_values_model_1 = __importDefault(require("./many-to-many/template-has-values.model"));
const ecampo_model_1 = __importDefault(require("./ecampo.model"));
const VALUES_TABLE = "VALUES";
const ValuesSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_value",
        type: sequelize_1.DataTypes.INTEGER,
    },
    field: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
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
    templateHasValuesId: {
        allowNull: false,
        field: "template_has_values_id_template_has_values",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: template_has_values_model_1.default.TEMPLATE_HAS_VALUES_TABLE,
            key: "id_template_has_values",
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
class Values extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.ECAMPO, { as: "ecampo" });
        this.belongsTo(models.TEMPLATE_HAS_VALUES, { as: "template_has_values" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: VALUES_TABLE,
            modelName: VALUES_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { VALUES_TABLE, ValuesSchema, Values };

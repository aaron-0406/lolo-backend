"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const FUNCIONARIO_TABLE = "FUNCIONARIO";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const FuncionarioSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_funcionario",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        field: "name",
        type: sequelize_1.DataTypes.STRING(150),
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
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
};
class Funcionario extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.hasMany(models.CLIENT, {
            as: "client",
            foreignKey: "funcionarioId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: FUNCIONARIO_TABLE,
            modelName: FUNCIONARIO_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { FUNCIONARIO_TABLE, FuncionarioSchema, Funcionario };

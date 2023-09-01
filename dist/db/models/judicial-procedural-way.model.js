"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const JUDICIAL_PROCEDURAL_WAY_TABLE = "JUDICIAL_PROCEDURAL_WAY";
const JudicialProceduralWaySchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_procedural_way",
        type: sequelize_1.DataTypes.INTEGER,
    },
    proceduralWay: {
        allowNull: false,
        field: "procedural_way",
        type: sequelize_1.DataTypes.STRING(150),
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
class JudicialProceduralWay extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_PROCEDURAL_WAY_TABLE,
            modelName: JUDICIAL_PROCEDURAL_WAY_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    JUDICIAL_PROCEDURAL_WAY_TABLE,
    JudicialProceduralWaySchema,
    JudicialProceduralWay,
};

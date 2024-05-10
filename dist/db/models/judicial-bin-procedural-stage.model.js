"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE = "JUDICIAL_BIN_PROCEDURAL_STAGE";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const JudicialBinProceduralStageSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_bin_procedural_stage",
        type: sequelize_1.DataTypes.INTEGER,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    proceduralStage: {
        allowNull: false,
        field: "procedural_stage",
        type: sequelize_1.DataTypes.STRING(150),
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: "updated_at",
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    deletedAt: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
        field: "deleted_at",
    },
    customerHasBankId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        field: "customer_has_bank_id_customer_has_bank",
        references: {
            model: CUSTOMER_HAS_BANK_TABLE,
            key: "id_customer_has_bank",
        },
    },
};
class JudicialBinProceduralStage extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
            modelName: JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
            timestamps: true,
            paranoid: true,
            deleteAt: "deleted_at",
        };
    }
}
exports.default = {
    JUDICIAL_BIN_PROCEDURAL_STAGE_TABLE,
    JudicialBinProceduralStageSchema,
    JudicialBinProceduralStage,
};

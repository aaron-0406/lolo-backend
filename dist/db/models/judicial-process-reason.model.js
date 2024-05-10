"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const JUDICIAL_PROCESS_REASON_TABLE = "JUDICIAL_PROCESS_REASON";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const JudicialProcessReasonSchema = {
    id: {
        primaryKey: true,
        allowNull: true,
        autoIncrement: true,
        field: "id_judicial_process_status_reason",
        type: sequelize_1.DataTypes.INTEGER,
    },
    reason: {
        allowNull: false,
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
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        field: "updated_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    deletedAt: {
        allowNull: true,
        field: "deleted_at",
        type: sequelize_1.DataTypes.DATE,
    },
};
class JudicialProcessReason extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_PROCESS_REASON_TABLE,
            modelName: JUDICIAL_PROCESS_REASON_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    JUDICIAL_PROCESS_REASON_TABLE,
    JudicialProcessReasonSchema,
    JudicialProcessReason,
};

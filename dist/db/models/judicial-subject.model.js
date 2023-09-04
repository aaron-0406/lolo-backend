"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const JUDICIAL_SUBJECT_TABLE = "JUDICIAL_SUBJECT";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const JudicialSubjectSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_subject",
        type: sequelize_1.DataTypes.INTEGER,
    },
    subject: {
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
};
class JudicialSubject extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_SUBJECT_TABLE,
            modelName: JUDICIAL_SUBJECT_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    JUDICIAL_SUBJECT_TABLE,
    JudicialSubjectSchema,
    JudicialSubject,
};

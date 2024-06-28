"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE = "JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const JudicialCollateralChargesEncumbrancesTypeLoadSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: "id_judicial_collateral_charges_encumbrances_type_load",
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
        field: "name",
    },
    customerHasBankId: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        field: "customer_has_bank_id_customer_has_bank",
        references: {
            model: CUSTOMER_HAS_BANK_TABLE,
            key: "id_customer_has_bank",
        }
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
class JudicialCollateralChargesEncumbrancesTypeLoad extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES, {
            as: "judicialCollateralChargesEncumbrance",
            foreignKey: "idTypeOfLoad",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
            modelName: JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    JUDICIAL_COLLATERAL_CHARGES_ENCUMBRANCES_TYPE_LOAD_TABLE,
    JudicialCollateralChargesEncumbrancesTypeLoadSchema,
    JudicialCollateralChargesEncumbrancesTypeLoad,
};

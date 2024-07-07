"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const judicial_collateral_model_1 = __importDefault(require("./judicial-collateral.model"));
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const JUDICIAL_COLLATERAL_FILES_TABLE = "JUDICIAL_COLLATERAL_FILES";
const { JUDICIAL_COLLATERAL_TABLE } = judicial_collateral_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const JudicialCollateralFilesSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id_judicial_collateral_files",
    },
    nameOriginAws: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
        field: "name_origin_aws",
    },
    originalName: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
        field: "original_name",
    },
    judicialCollateralIdJudicialCollateral: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "judicial_collateral_id_judicial_collateral",
        references: {
            model: JUDICIAL_COLLATERAL_TABLE,
            key: "id_judicial_collateral",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    customerHasBankId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: "customer_has_bank_id_customer_has_bank",
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
class JudicialCollateralFiles extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.JUDICIAL_COLLATERAL, { as: "judicialCollateral" });
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_COLLATERAL_FILES_TABLE,
            modelName: JUDICIAL_COLLATERAL_FILES_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    JUDICIAL_COLLATERAL_FILES_TABLE,
    JudicialCollateralFilesSchema,
    JudicialCollateralFiles,
};

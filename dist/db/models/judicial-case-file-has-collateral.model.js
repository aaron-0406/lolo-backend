"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const judicial_collateral_model_1 = __importDefault(require("./judicial-collateral.model"));
const judicial_case_file_model_1 = __importDefault(require("./judicial-case-file.model"));
const JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE = "JUDICIAL_CASE_FILE_HAS_COLLATERAL";
const { JUDICIAL_COLLATERAL_TABLE } = judicial_collateral_model_1.default;
const { JUDICIAL_CASE_FILE_TABLE } = judicial_case_file_model_1.default;
const JudicialCaseFileHasCollateralSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_case_file_has_collateral",
        type: sequelize_1.DataTypes.INTEGER,
    },
    judicialCaseFileId: {
        allowNull: false,
        field: "judicial_case_file_id",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: JUDICIAL_CASE_FILE_TABLE,
            key: "id_judicial_case_file",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    judicialCollateralId: {
        allowNull: false,
        field: "judicial_collateral_id",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: JUDICIAL_COLLATERAL_TABLE,
            key: "id_judicial_collateral",
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
class JudicialCaseFileHasCollateral extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.JUDICIAL_CASE_FILE, { as: "judicialCaseFile" });
        this.belongsTo(models.JUDICIAL_COLLATERAL, { as: "judicialCollateral" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE,
            modelName: JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    JudicialCaseFileHasCollateral,
    JudicialCaseFileHasCollateralSchema,
    JUDICIAL_CASE_FILE_HAS_COLLATERAL_TABLE,
};

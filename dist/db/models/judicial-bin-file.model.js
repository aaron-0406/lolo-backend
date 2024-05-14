"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const judicial_binnacle_model_1 = __importDefault(require("./judicial-binnacle.model"));
const JUDICIAL_BIN_FILE = "JUDICIAL_BIN_FILE";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { JUDICIAL_BINNACLE_TABLE } = judicial_binnacle_model_1.default;
const JudicialBinFileSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_bin_file",
        type: sequelize_1.DataTypes.INTEGER,
    },
    judicialBinnacleId: {
        allowNull: false,
        field: "judicial_binnacle_id_judicial_binnacle",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: JUDICIAL_BINNACLE_TABLE,
            key: "id_judicial_binnacle",
        },
    },
    size: {
        allowNull: false,
        field: "size",
        type: sequelize_1.DataTypes.NUMBER,
    },
    nameOriginAws: {
        allowNull: false,
        field: "name_origin_aws",
        type: sequelize_1.DataTypes.STRING,
    },
    originalName: {
        allowNull: false,
        field: "original_name",
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
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
class JudicialBinFile extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.JUDICIAL_BINNACLE, {
            as: "judicialBinnacle",
            foreignKey: "judicialBinnacleId",
        });
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_BIN_FILE,
            modelName: JUDICIAL_BIN_FILE,
            timestamps: true,
            paranoid: true,
            deleteAt: "deleted_at",
        };
    }
}
exports.default = {
    JUDICIAL_BIN_FILE,
    JudicialBinFileSchema,
    JudicialBinFile,
};

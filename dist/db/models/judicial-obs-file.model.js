"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const judicial_observation_model_1 = __importDefault(require("./judicial-observation.model"));
const JUDICIAL_OBS_FILE_TABLE = "JUDICIAL_OBS_FILE";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { JUDICIAL_OBSERVATION_TABLE } = judicial_observation_model_1.default;
const JudicialObsFileSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_obs_file",
        type: sequelize_1.DataTypes.INTEGER,
    },
    awsName: {
        allowNull: false,
        field: "aws_name",
        type: sequelize_1.DataTypes.TEXT("long"),
    },
    originalName: {
        allowNull: false,
        field: "original_name",
        type: sequelize_1.DataTypes.TEXT("long"),
    },
    judicialObservationId: {
        allowNull: false,
        field: "judicial_observation_id_judicial_observation",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: JUDICIAL_OBSERVATION_TABLE,
            key: "id_judicial_observation",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
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
class JudicialObsFile extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.belongsTo(models.JUDICIAL_OBSERVATION, {
            as: "judicialObservation",
            foreignKey: "judicialObservationId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_OBS_FILE_TABLE,
            modelName: JUDICIAL_OBS_FILE_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    JUDICIAL_OBS_FILE_TABLE,
    JudicialObsFileSchema,
    JudicialObsFile,
};

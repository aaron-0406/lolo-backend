"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const judicial_case_file_model_1 = __importDefault(require("./judicial-case-file.model"));
const judicial_obs_type_model_1 = __importDefault(require("./judicial-obs-type.model"));
const JUDICIAL_OBSERVATION_TABLE = "JUDICIAL_OBSERVATION";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { JUDICIAL_CASE_FILE_TABLE } = judicial_case_file_model_1.default;
const { JUDICIAL_OBS_TYPE_TABLE } = judicial_obs_type_model_1.default;
const JudicialObservationSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_observation",
        type: sequelize_1.DataTypes.INTEGER,
    },
    date: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    comment: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT("long"),
    },
    judicialCaseFileId: {
        allowNull: false,
        field: "judicial_case_file_id_judicial_case_file",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: JUDICIAL_CASE_FILE_TABLE,
            key: "id_judicial_case_file",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    judicialObsTypeId: {
        allowNull: false,
        field: "judicial_obs_type_id_judicial_obs_type",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: JUDICIAL_OBS_TYPE_TABLE,
            key: "id_judicial_obs_type",
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
class JudicialObservation extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.belongsTo(models.JUDICIAL_OBS_TYPE, { as: "judicialObsType" });
        this.hasOne(models.JUDICIAL_CASE_FILE, {
            as: "judicialCaseFile",
            foreignKey: "id_judicial_case_file",
        });
        this.hasMany(models.JUDICIAL_OBS_FILE, {
            as: "judicialObsFile",
            foreignKey: "judicialObservationId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_OBSERVATION_TABLE,
            modelName: JUDICIAL_OBSERVATION_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    JUDICIAL_OBSERVATION_TABLE,
    JudicialObservationSchema,
    JudicialObservation,
};

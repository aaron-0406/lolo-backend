"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const JUDICIAL_REGISTRATION_AREA_TABLE = "JUDICIAL_REGISTRATION_AREA";
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const JudicialRegistrationAreaSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_registration_area",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
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
class JudicialRegistrationArea extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.hasMany(models.JUDICIAL_COLLATERAL, {
            as: "judicialCollateral",
            foreignKey: "registrationAreaId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_REGISTRATION_AREA_TABLE,
            modelName: JUDICIAL_REGISTRATION_AREA_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = {
    JudicialRegistrationArea,
    JudicialRegistrationAreaSchema,
    JUDICIAL_REGISTRATION_AREA_TABLE,
};

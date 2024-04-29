"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const MANAGEMENT_ACTION_TABLE = "MANAGEMENT_ACTION";
const ManagementActionSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_management_action",
        type: sequelize_1.DataTypes.INTEGER,
    },
    codeAction: {
        allowNull: false,
        field: "code_action",
        type: sequelize_1.DataTypes.STRING(10),
    },
    nameAction: {
        allowNull: false,
        field: "name_action",
        type: sequelize_1.DataTypes.STRING(150),
    },
    codeSubTypeManagement: {
        allowNull: false,
        field: "code_sub_type_management",
        type: sequelize_1.DataTypes.STRING(10),
    },
    customerHasBankId: {
        allowNull: false,
        field: "customer_has_bank_id_customer_has_bank",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: customer_has_bank_model_1.default.CUSTOMER_HAS_BANK_TABLE,
            key: "id_customer_has_bank",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
};
class ManagementAction extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.hasMany(models.COMMENT, {
            as: "comment",
            foreignKey: "managementActionId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: MANAGEMENT_ACTION_TABLE,
            modelName: MANAGEMENT_ACTION_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    MANAGEMENT_ACTION_TABLE,
    ManagementActionSchema,
    ManagementAction,
};

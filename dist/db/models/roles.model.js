"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_model_1 = __importDefault(require("./customer.model"));
const ROLE_TABLE = "ROLE";
const RoleSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_role",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: { type: sequelize_1.DataTypes.STRING(150), allowNull: false },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "customer_id_customer",
        references: {
            model: customer_model_1.default.CUSTOMER_TABLE,
            key: "id_customer",
        },
    },
};
class Role extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER, { as: "customer" });
        this.hasMany(models.CUSTOMER_USER, {
            as: "customerUser",
            foreignKey: "roleId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: ROLE_TABLE,
            modelName: ROLE_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { ROLE_TABLE, RoleSchema, Role };

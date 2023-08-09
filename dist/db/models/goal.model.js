"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_model_1 = __importDefault(require("./customer.model"));
const GOAL_TABLE = "GOAL";
const { CUSTOMER_TABLE } = customer_model_1.default;
const GoalSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_goal",
        type: sequelize_1.DataTypes.INTEGER,
    },
    startDate: {
        allowNull: false,
        field: "start_date",
        type: sequelize_1.DataTypes.DATEONLY,
    },
    week: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    endDate: {
        field: "end_date",
        allowNull: true,
        type: sequelize_1.DataTypes.DATEONLY,
    },
    customerId: {
        allowNull: false,
        field: "customer_id_customer",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: "id_customer",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
};
class Goal extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.GOAL_USER, { as: "goalUser", foreignKey: "goalId" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: GOAL_TABLE,
            modelName: GOAL_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { GOAL_TABLE, GoalSchema, Goal };

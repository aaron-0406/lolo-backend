"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const goal_model_1 = __importDefault(require("./goal.model"));
const customer_user_model_1 = __importDefault(require("./customer-user.model"));
const { GOAL_TABLE } = goal_model_1.default;
const { CUSTOMER_USER_TABLE } = customer_user_model_1.default;
const GOAL_USER_TABLE = "GOAL_USER";
const GoalUserSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_goal_user",
        type: sequelize_1.DataTypes.INTEGER,
    },
    quantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    goalId: {
        allowNull: false,
        field: "goal_id_goal",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: GOAL_TABLE,
            key: "id_goal",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    customerUserId: {
        allowNull: false,
        field: "customer_user_id_customer_user",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: CUSTOMER_USER_TABLE,
            key: "id_customer_user",
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
};
class GoalUser extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_USER, { as: "customerUser" });
        this.belongsTo(models.GOAL, { as: "goal" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: GOAL_USER_TABLE,
            modelName: GOAL_USER_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { GOAL_USER_TABLE, GoalUserSchema, GoalUser };

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const goal_model_1 = __importDefault(require("../models/goal.model"));
const goal_user_model_1 = __importDefault(require("../models/goal-user.model"));
const customer_user_model_1 = __importDefault(require("../models/customer-user.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const { GOAL_USER_TABLE } = goal_user_model_1.default;
const { CUSTOMER_USER_TABLE } = customer_user_model_1.default;
const { GOAL_TABLE } = goal_model_1.default;
const { CUSTOMER_TABLE } = customer_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(GOAL_TABLE, {
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
            endDate: {
                allowNull: false,
                field: "end_date",
                type: sequelize_1.DataTypes.DATEONLY,
            },
            week: {
                allowNull: false,
                field: "week",
                type: sequelize_1.DataTypes.INTEGER,
            },
            customerUserId: {
                allowNull: false,
                field: "customer_id_customer",
                references: {
                    model: CUSTOMER_TABLE,
                    key: "id_customer",
                },
                type: sequelize_1.DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: false,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
                type: sequelize_1.DataTypes.DATE,
            },
        });
        yield queryInterface.addConstraint(GOAL_TABLE, {
            fields: ["customer_id_customer"],
            type: "foreign key",
            name: "fk_goal_customer",
            references: {
                table: CUSTOMER_TABLE,
                field: "id_customer",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.createTable(GOAL_USER_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_goal_user",
                type: sequelize_1.DataTypes.INTEGER,
            },
            quantity: {
                allowNull: false,
                field: "quantity",
                type: sequelize_1.DataTypes.INTEGER,
            },
            goalId: {
                allowNull: false,
                field: "goal_id_goal",
                references: {
                    model: GOAL_TABLE,
                    key: "id_goal",
                },
                type: sequelize_1.DataTypes.INTEGER,
            },
            customerUserId: {
                allowNull: false,
                field: "customer_user_id_customer_user",
                references: {
                    model: CUSTOMER_USER_TABLE,
                    key: "id_customer_user",
                },
                type: sequelize_1.DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: false,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
                type: sequelize_1.DataTypes.DATE,
            },
        });
        yield queryInterface.addConstraint(GOAL_USER_TABLE, {
            fields: ["customer_user_id_customer_user"],
            type: "foreign key",
            name: "fk_goal_user_customer_user",
            references: {
                table: CUSTOMER_USER_TABLE,
                field: "id_customer_user",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.addConstraint(GOAL_USER_TABLE, {
            fields: ["goal_id_goal"],
            type: "foreign key",
            name: "fk_goal_user_goal",
            references: {
                table: GOAL_TABLE,
                field: "id_goal",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeConstraint(GOAL_USER_TABLE, "fk_goal_user_customer_user");
        yield queryInterface.removeConstraint(GOAL_USER_TABLE, "fk_goal_user_goal");
        yield queryInterface.dropTable(GOAL_USER_TABLE);
        yield queryInterface.dropTable(GOAL_TABLE);
    });
}
exports.down = down;

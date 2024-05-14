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
const user_log_model_1 = __importDefault(require("../models/user-log.model"));
const customer_user_model_1 = __importDefault(require("../models/customer-user.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const { USER_LOG_TABLE } = user_log_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(USER_LOG_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_user_log",
                type: sequelize_1.DataTypes.INTEGER,
            },
            codeAction: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(150),
            },
            entityId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
            },
            entity: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(150),
            },
            ip: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(100),
            },
            createAt: {
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
                type: sequelize_1.DataTypes.DATE,
            },
            customerUserId: {
                allowNull: false,
                field: "customer_user_id_customer_user",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: customer_user_model_1.default.CUSTOMER_USER_TABLE,
                    key: "id_customer_user",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            customerId: {
                allowNull: false,
                field: "customer_id_customer",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: customer_model_1.default.CUSTOMER_TABLE,
                    key: "id_customer",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.dropTable(USER_LOG_TABLE);
    });
}
exports.down = down;

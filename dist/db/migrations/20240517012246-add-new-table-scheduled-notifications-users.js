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
const scheduled_notifications_model_1 = __importDefault(require("../models/settings/scheduled-notifications.model."));
const scheduled_notifications_users_model_1 = __importDefault(require("../models/settings/scheduled-notifications-users.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const customer_user_model_1 = __importDefault(require("../models/customer-user.model"));
const { SCHEDULED_NOTIFICATIONS_USERS_TABLE } = scheduled_notifications_users_model_1.default;
const { SCHEDULED_NOTIFICATIONS_TABLE } = scheduled_notifications_model_1.default;
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { CUSTOMER_USER_TABLE } = customer_user_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(SCHEDULED_NOTIFICATIONS_USERS_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_scheduled_notification_user",
                type: sequelize_1.DataTypes.INTEGER,
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
            scheduledNotificationId: {
                allowNull: false,
                references: {
                    model: SCHEDULED_NOTIFICATIONS_TABLE,
                    key: "id_scheduled_notification",
                },
                field: "scheduled_notification_id_scheduled_notification",
                type: sequelize_1.DataTypes.INTEGER,
            },
            customerUserId: {
                allowNull: false,
                references: {
                    model: CUSTOMER_USER_TABLE,
                    key: "id_customer_user",
                },
                field: "customer_user_id_customer_user",
                type: sequelize_1.DataTypes.INTEGER,
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
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.dropTable(SCHEDULED_NOTIFICATIONS_USERS_TABLE);
    });
}
exports.down = down;
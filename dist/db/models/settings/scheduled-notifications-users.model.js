"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("../many-to-many/customer-has-bank.model"));
const scheduled_notifications_model_1 = __importDefault(require("./scheduled-notifications.model"));
const customer_user_model_1 = __importDefault(require("../customer-user.model"));
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { SCHEDULED_NOTIFICATIONS_TABLE } = scheduled_notifications_model_1.default;
const { CUSTOMER_USER_TABLE } = customer_user_model_1.default;
const SCHEDULED_NOTIFICATIONS_USERS_TABLE = "SCHEDULED_NOTIFICATIONS_USERS";
const ScheduledNotificationsUsersSchema = {
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
};
class ScheduledNotificationsUsers extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.belongsTo(models.SCHEDULED_NOTIFICATIONS, {
            as: "scheduledNotification",
        });
        this.belongsTo(models.CUSTOMER_USER, { as: "customerUser" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: SCHEDULED_NOTIFICATIONS_USERS_TABLE,
            modelName: SCHEDULED_NOTIFICATIONS_USERS_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    SCHEDULED_NOTIFICATIONS_USERS_TABLE,
    ScheduledNotificationsUsersSchema,
    ScheduledNotificationsUsers,
};

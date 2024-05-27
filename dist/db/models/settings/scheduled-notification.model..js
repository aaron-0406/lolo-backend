"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("../many-to-many/customer-has-bank.model"));
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const SCHEDULED_NOTIFICATION_TABLE = "SCHEDULED_NOTIFICATION";
const ScheduledNotificationSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_scheduled_notification",
        type: sequelize_1.DataTypes.INTEGER,
    },
    nameNotification: {
        allowNull: false,
        field: "name_notification",
        type: sequelize_1.DataTypes.STRING(150),
    },
    descriptionNotification: {
        allowNull: false,
        field: "description_notification",
        type: sequelize_1.DataTypes.TEXT("long"),
    },
    frequencyToNotify: {
        allowNull: false,
        field: "frequency_to_notify",
        type: sequelize_1.DataTypes.INTEGER,
    },
    hourTimeToNotify: {
        allowNull: false,
        field: "hour_time_to_notify",
        type: sequelize_1.DataTypes.DATE,
    },
    logicKey: {
        allowNull: false,
        field: "logic_key",
        type: sequelize_1.DataTypes.STRING(150),
    },
    state: {
        allowNull: false,
        field: "state",
        type: sequelize_1.DataTypes.BOOLEAN,
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
class ScheduledNotification extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.hasMany(models.SCHELUDED_NOTIFICATIONS_USERS, {
            as: 'scheduledNotificationsUsers',
            foreignKey: 'scheduledNotificationId'
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: SCHEDULED_NOTIFICATION_TABLE,
            modelName: SCHEDULED_NOTIFICATION_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    SCHEDULED_NOTIFICATION_TABLE,
    ScheduledNotificationSchema,
    ScheduledNotification,
};

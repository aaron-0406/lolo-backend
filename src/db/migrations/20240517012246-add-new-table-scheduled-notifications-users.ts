import { DataTypes, QueryInterface } from "sequelize";
import scheduledNotificationsModel from "../models/settings/scheduled-notification.model.";
import scheduledNotificationsUsersModel from "../models/settings/scheduled-notifications-users.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";
import customerUserModel from "../models/customer-user.model";

const { SCHEDULED_NOTIFICATIONS_USERS_TABLE } = scheduledNotificationsUsersModel;
const { SCHEDULED_NOTIFICATION_TABLE } = scheduledNotificationsModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { CUSTOMER_USER_TABLE } = customerUserModel

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(SCHEDULED_NOTIFICATIONS_USERS_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_scheduled_notification",
      type: DataTypes.INTEGER,
    },

    customerHasBankId: {
      allowNull: false,
      field: "customer_has_bank_id_customer_has_bank",
      type: DataTypes.INTEGER,
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    scheduledNotificationId: {
      allowNull: false,
      references:{
        model: SCHEDULED_NOTIFICATION_TABLE,
        key: "id_scheduled_notification",
      },
      field: "scheduled_notification_id_scheduled_notification",
      type: DataTypes.INTEGER,
    },
    customerUserId: {
      allowNull: false,
      references: {
        model: CUSTOMER_USER_TABLE,
        key: "id_customer_user",
      },
      field: "customer_user_id_customer_user",
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      field: "deleted_at",
      type: DataTypes.DATE,
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(SCHEDULED_NOTIFICATION_TABLE);
}
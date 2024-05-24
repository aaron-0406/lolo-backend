import { DataTypes, QueryInterface } from "sequelize";
import scheduledNotificationsModel from "../models/settings/scheduled-notifications.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { SCHEDULED_NOTIFICATIONS_TABLE } = scheduledNotificationsModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(SCHEDULED_NOTIFICATIONS_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_scheduled_notification",
      type: DataTypes.INTEGER,
    },
    nameNotification: {
      allowNull: false,
      field: "name_notification",
      type: DataTypes.STRING(150),
    },
    descriptionNotification: {
      allowNull: false,
      field: "description_notification",
      type: DataTypes.TEXT("long"),
    },
    frequencyToNotify: {
      allowNull: false,
      field: "frequency_to_notify",
      type: DataTypes.INTEGER,
    },
    hourTimeToNotify: {
      allowNull: false,
      field: "hour_time_to_notify",
      type: DataTypes.DATE,
    },
    logicKey: {
      allowNull: false,
      field: "logic_key",
      type: DataTypes.STRING(150),
    },
    state: {
      allowNull: false,
      field: "state",
      type: DataTypes.BOOLEAN,
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
  await queryInterface.dropTable(SCHEDULED_NOTIFICATIONS_TABLE);
}
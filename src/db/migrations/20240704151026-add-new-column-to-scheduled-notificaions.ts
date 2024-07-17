import { DataTypes, QueryInterface } from "sequelize";
import scheduledNotificationsModel from "../models/settings/scheduled-notifications.model";

const { SCHEDULED_NOTIFICATIONS_TABLE } = scheduledNotificationsModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(SCHEDULED_NOTIFICATIONS_TABLE, "days_to_notify", {
    allowNull: true,
    field: "days_to_notify",
    type: DataTypes.STRING,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(SCHEDULED_NOTIFICATIONS_TABLE, "days_to_notify");
}
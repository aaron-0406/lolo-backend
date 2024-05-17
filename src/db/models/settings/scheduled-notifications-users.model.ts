import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ScheduledNotificationsUsersType } from "../../../app/settings/types/scheduled-notifications-users.type";
import customerHasBankModel from "../many-to-many/customer-has-bank.model";
import scheduledNotificationModel from "./scheduled-notification.model.";
import customerUserModel from "../customer-user.model";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { SCHEDULED_NOTIFICATION_TABLE } = scheduledNotificationModel;
const { CUSTOMER_USER_TABLE } = customerUserModel

const SCHEDULED_NOTIFICATIONS_USERS_TABLE = "SCHEDULED_NOTIFICATIONS_USERS";

const ScheduledNotificationsUsersSchema: ModelAttributes<
  ScheduledNotificationsUsers,
  ScheduledNotificationsUsersType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_scheduled_notification_user",
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
};

class ScheduledNotificationsUsers extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.belongsTo(models.SCHELUDED_NOTIFICATION, { as: "scheduledNotification" });
    this.belongsTo(models.CUSTOMER_USER, { as: "customerUser" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: SCHEDULED_NOTIFICATIONS_USERS_TABLE,
      modelName: SCHEDULED_NOTIFICATIONS_USERS_TABLE,
      timestamps: false,
    };
  }
}

export default {
  SCHEDULED_NOTIFICATIONS_USERS_TABLE,
  ScheduledNotificationsUsersSchema,
  ScheduledNotificationsUsers,
};

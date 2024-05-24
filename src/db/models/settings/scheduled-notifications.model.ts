import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ScheduledNotificationType } from "../../../app/settings/types/scheduled-notifications.type";
import customerHasBankModel from "../many-to-many/customer-has-bank.model";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const SCHEDULED_NOTIFICATIONS_TABLE = "SCHEDULED_NOTIFICATIONS";

const ScheduledNotificationsSchema: ModelAttributes<
  ScheduledNotifications,
  ScheduledNotificationType
> = {
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
};

class ScheduledNotifications extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.hasMany(models.SCHEDULED_NOTIFICATIONS_USERS , {
      as: 'scheduledNotificationsUsers',
      foreignKey: 'scheduledNotificationId'
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: SCHEDULED_NOTIFICATIONS_TABLE,
      modelName: SCHEDULED_NOTIFICATIONS_TABLE,
      timestamps: false,
    };
  }
}

export default {
  SCHEDULED_NOTIFICATIONS_TABLE,
  ScheduledNotificationsSchema,
  ScheduledNotifications,
};

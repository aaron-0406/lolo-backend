import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import judicialBinnacleModel from "./judicial-binnacle.model";
import { JudicialBinNotificationType } from "../../app/judicial/types/judicial-bin-notification.type";

const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel;

const JUDICIAL_BIN_NOTIFICATION_TABLE = "JUDICIAL_BIN_NOTIFICATION";

const JudicialBinNotificationSchema: ModelAttributes<
  JudicialBinNotification,
  JudicialBinNotificationType
> = {
  id: {
    type: DataTypes.INTEGER,
    field: 'id_judicial_bin_notification',
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
notificationCode: {
    field: 'notification_code',
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null
  },
  addressee: {
    field: 'addressee',
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null
  },
  shipDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'ship_date',
    defaultValue: null
  },
  attachments: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'attachments',
    defaultValue: null
  },
  deliveryMethod: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'delivery_method',
    defaultValue: null
  },
  resolutionDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'resolution_date',
    defaultValue: null
  },
  notificationPrint: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'notification_print',
    defaultValue: null
  },
  sentCentral: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'sent_central',
    defaultValue: null
  },
  centralReceipt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'central_receipt',
    defaultValue: null
  },
  notificationToRecipientOn: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'notification_to_recipient_on',
    defaultValue: null
  },
  chargeReturnedToCourtOn: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'charge_returned_to_court_on',
    defaultValue: null
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
  idJudicialBinacle: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'judicial_binacle_id_judicial_binacle',
    references: {
      model: JUDICIAL_BINNACLE_TABLE,
      key: 'id_judicial_binnacle',
    },
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION',
  },
};

class JudicialBinNotification extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.JUDICIAL_BINNACLE, {
      as: "judicialBinnacle",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_BIN_NOTIFICATION_TABLE,
      modelName: JUDICIAL_BIN_NOTIFICATION_TABLE,
      timestamps: true,
      paranoid: true,
      deleteAt: "deleted_at",
    };
  }
}

export default {
  JUDICIAL_BIN_NOTIFICATION_TABLE,
  JudicialBinNotificationSchema,
  JudicialBinNotification,
};

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
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_judicial_bin_notification",
    type: DataTypes.INTEGER,
  },
  number: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "number",
  },
  addressee: {
    allowNull: false,
    type: DataTypes.STRING(200),
    field: "addressee",
  },
  shipDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "ship_date",
  },
  attachments: {
    allowNull: false,
    type: DataTypes.STRING(200),
    field: "attachments",
  },
  deliveryMethod: {
    allowNull: false,
    type: DataTypes.STRING(200),
    field: "delivery_method",
  },
  resolutionDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "resolution_date",
  },
  notificationPrint: {
    allowNull: false,
    type: DataTypes.STRING(200),
    field: "notification_print",
  },
  sentCentral: {
    allowNull: false,
    type: DataTypes.STRING(200),
    field: "sent_central",
  },
  centralReceipt: {
    allowNull: false,
    type: DataTypes.STRING(200),
    field: "central_receipt",
  },
  idJudicialBinacle: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "judicial_binacle_id_judicial_binacle",
    references: {
      model: JUDICIAL_BINNACLE_TABLE,
      key: "id_judicial_binnacle",
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

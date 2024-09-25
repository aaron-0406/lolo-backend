"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const judicial_binnacle_model_1 = __importDefault(require("./judicial-binnacle.model"));
const { JUDICIAL_BINNACLE_TABLE } = judicial_binnacle_model_1.default;
const JUDICIAL_BIN_NOTIFICATION_TABLE = "JUDICIAL_BIN_NOTIFICATION";
const JudicialBinNotificationSchema = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'id_judicial_bin_notification',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    notificationCode: {
        field: 'notification_code',
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
        defaultValue: null
    },
    addressee: {
        field: 'addressee',
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
        defaultValue: null
    },
    shipDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'ship_date',
        defaultValue: null
    },
    attachments: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
        field: 'attachments',
        defaultValue: null
    },
    deliveryMethod: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true,
        field: 'delivery_method',
        defaultValue: null
    },
    resolutionDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'resolution_date',
        defaultValue: null
    },
    notificationPrint: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'notification_print',
        defaultValue: null
    },
    sentCentral: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'sent_central',
        defaultValue: null
    },
    centralReceipt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'central_receipt',
        defaultValue: null
    },
    notificationToRecipientOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'notification_to_recipient_on',
        defaultValue: null
    },
    chargeReturnedToCourtOn: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'charge_returned_to_court_on',
        defaultValue: null
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
    idJudicialBinacle: {
        type: sequelize_1.DataTypes.INTEGER,
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
class JudicialBinNotification extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.JUDICIAL_BINNACLE, {
            as: "judicialBinnacle",
        });
    }
    static config(sequelize) {
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
exports.default = {
    JUDICIAL_BIN_NOTIFICATION_TABLE,
    JudicialBinNotificationSchema,
    JudicialBinNotification,
};

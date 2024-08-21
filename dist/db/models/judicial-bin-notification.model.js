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
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_bin_notification",
        type: sequelize_1.DataTypes.INTEGER,
    },
    number: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        field: "number",
    },
    addressee: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
        field: "addressee",
    },
    shipDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: "ship_date",
    },
    attachments: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
        field: "attachments",
    },
    deliveryMethod: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
        field: "delivery_method",
    },
    resolutionDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
        field: "resolution_date",
    },
    notificationPrint: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
        field: "notification_print",
    },
    sentCentral: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
        field: "sent_central",
    },
    centralReceipt: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
        field: "central_receipt",
    },
    idJudicialBinacle: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
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

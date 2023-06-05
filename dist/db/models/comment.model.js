"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const client_model_1 = __importDefault(require("./client.model"));
const customer_user_model_1 = __importDefault(require("./customer-user.model"));
const management_action_model_1 = __importDefault(require("./management-action.model"));
const COMMENT_TABLE = "COMMENT";
const CommentSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_comment",
        type: sequelize_1.DataTypes.INTEGER,
    },
    comment: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(400),
    },
    managementActionId: {
        allowNull: true,
        field: "management_action_id_management_action",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: management_action_model_1.default.MANAGEMENT_ACTION_TABLE,
            key: "id_management_action",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    negotiation: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    date: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATEONLY,
    },
    hour: {
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    customerUserId: {
        allowNull: false,
        field: "customer_user_id_customer_user",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: customer_user_model_1.default.CUSTOMER_USER_TABLE,
            key: "id_customer_user",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    clientId: {
        allowNull: false,
        field: "client_id_client",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: client_model_1.default.CLIENT_TABLE,
            key: "id_client",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
};
class Comment extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CUSTOMER_USER, { as: "customerUser" });
        this.belongsTo(models.CLIENT, { as: "client" });
        this.belongsTo(models.MANAGEMENT_ACTION, { as: "managementAction" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: COMMENT_TABLE,
            modelName: COMMENT_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { COMMENT_TABLE, CommentSchema, Comment };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_user_model_1 = __importDefault(require("./customer-user.model"));
const customer_model_1 = __importDefault(require("./customer.model"));
const USER_LOG_TABLE = "USER_LOG";
const UserLogSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_user_log",
        type: sequelize_1.DataTypes.INTEGER,
    },
    codeAction: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    entityId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    entity: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    ip: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    createAt: {
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
        onDelete: "NO ACTION",
    },
    customerId: {
        allowNull: false,
        field: "customer_id_customer",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: customer_model_1.default.CUSTOMER_TABLE,
            key: "id_customer",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    methodSumary: {
        allowNull: true,
        field: "method_summary",
        type: sequelize_1.DataTypes.TEXT("long"),
    }
};
class UserLog extends sequelize_1.Model {
    static associate(models) {
        //associate
        this.belongsTo(models.CUSTOMER_USER, { as: "customerUser" });
        this.belongsTo(models.CUSTOMER, { as: "customer" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_LOG_TABLE,
            modelName: USER_LOG_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { USER_LOG_TABLE, UserLogSchema, UserLog };

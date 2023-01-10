"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const USER_APP_TABLE = "USER_APP";
const UserAppSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_user_app",
        type: sequelize_1.DataTypes.INTEGER,
    },
    code: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(9),
    },
    dni: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(8),
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(100),
    },
    lastName: {
        allowNull: false,
        field: "last_name",
        type: sequelize_1.DataTypes.STRING(100),
    },
    address: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(150),
    },
    phone: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(50),
    },
    email: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING(70),
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(70),
    },
    state: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT({ length: 1 }),
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
};
class UserApp extends sequelize_1.Model {
    static associate() {
        //associate
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_APP_TABLE,
            modelName: USER_APP_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { USER_APP_TABLE, UserAppSchema, UserApp };

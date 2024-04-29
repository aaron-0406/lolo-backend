"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const CUSTOMER_TABLE = "CUSTOMER";
const CustomerSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_customer",
        type: sequelize_1.DataTypes.INTEGER,
    },
    ruc: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING(11),
    },
    companyName: {
        allowNull: false,
        field: "company_name",
        type: sequelize_1.DataTypes.STRING(150),
    },
    urlIdentifier: {
        allowNull: false,
        unique: true,
        field: "url_identifier",
        type: sequelize_1.DataTypes.STRING(100),
    },
    description: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT("tiny"),
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
class Customer extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.CUSTOMER_USER, {
            as: "customerUser",
            foreignKey: "customerId",
        });
        this.hasMany(models.CITY, {
            as: "city",
            foreignKey: "customerId",
        });
        this.belongsToMany(models.BANK, {
            as: "customerBanks",
            through: models.CUSTOMER_HAS_BANK,
            foreignKey: "idCustomer",
            otherKey: "idBank",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: CUSTOMER_TABLE,
            timestamps: false,
        };
    }
}
exports.default = { CUSTOMER_TABLE, CustomerSchema, Customer };

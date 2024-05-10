"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const ext_tag_group_model_1 = __importDefault(require("./ext-tag-group.model"));
const { CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { EXT_TAG_GROUP_TABLE } = ext_tag_group_model_1.default;
const EXT_TAG_TABLE = "EXT_TAG";
const ExtTagSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_ext_tag",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
    },
    color: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(7),
    },
    action: {
        allowNull: false,
        type: sequelize_1.DataTypes.TINYINT({ length: 1 }),
    },
    tagGroupId: {
        allowNull: false,
        field: "tag_group_id_group_tag",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: EXT_TAG_GROUP_TABLE,
            key: "id_ext_tag_group",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    customerHasBankId: {
        allowNull: false,
        field: "customer_has_bank_id_customer_has_bank",
        type: sequelize_1.DataTypes.INTEGER,
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
class ExtTag extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.EXT_TAG_GROUP, {
            as: "extTagGroup",
            foreignKey: "tagGroupId",
        });
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: EXT_TAG_TABLE,
            modelName: EXT_TAG_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = { EXT_TAG_TABLE, ExtTagSchema, ExtTag };

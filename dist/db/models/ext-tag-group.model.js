"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const EXT_TAG_GROUP_TABLE = "EXT_TAG_GROUP";
const ExtTagGroupSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_ext_tag_group",
        type: sequelize_1.DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING(200),
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
class ExtTagGroup extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.EXT_TAG, {
            as: "extTag",
            foreignKey: "tagGroupId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: EXT_TAG_GROUP_TABLE,
            modelName: EXT_TAG_GROUP_TABLE,
            timestamps: true,
            paranoid: true,
            deletedAt: "deleted_at",
        };
    }
}
exports.default = { EXT_TAG_GROUP_TABLE, ExtTagGroupSchema, ExtTagGroup };

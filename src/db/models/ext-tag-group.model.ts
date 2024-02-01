import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ExtTagGroupType } from "../../app/extrajudicial/types/ext-tag-group.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const EXT_TAG_GROUP_TABLE = "EXT_TAG_GROUP";

const ExtTagGroupSchema: ModelAttributes<ExtTagGroup, ExtTagGroupType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_ext_tag_group",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  customerHasBankId: {
    allowNull: false,
    field: "customer_has_bank_id_customer_has_bank",
    type: DataTypes.INTEGER,
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

class ExtTagGroup extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.hasMany(models.EXT_TAG, {
      as: "extTag",
      foreignKey: "tagGroupId",
    });
  }

  static config(sequelize: Sequelize) {
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

export default { EXT_TAG_GROUP_TABLE, ExtTagGroupSchema, ExtTagGroup };

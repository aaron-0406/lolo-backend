import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ExtTagType } from "../../app/extrajudicial/types/ext-tag.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";
import extTagGroupModel from "./ext-tag-group.model";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { EXT_TAG_GROUP_TABLE } = extTagGroupModel;

const EXT_TAG_TABLE = "EXT_TAG";

const ExtTagSchema: ModelAttributes<ExtTag, ExtTagType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_ext_tag",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING(7),
  },
  tagGroupId: {
    allowNull: false,
    field: "tag_group_id_group_tag",
    type: DataTypes.INTEGER,
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

class ExtTag extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.EXT_TAG_GROUP, { as: "extTagGroup" });
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
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

export default { EXT_TAG_TABLE, ExtTagSchema, ExtTag };

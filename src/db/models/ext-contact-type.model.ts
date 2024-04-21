import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ExtContactTypeType } from "../../app/extrajudicial/types/ext-contact-type.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const EXT_CONTACT_TYPE_TABLE = "EXT_CONTACT_TYPE";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const ExtContactTypeSchema: ModelAttributes<
  ExtContactType,
  ExtContactTypeType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_ext_contact_type",
    type: DataTypes.INTEGER,
  },
  contactType: {
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

class ExtContactType extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });

    this.hasMany(models.EXT_CONTACT, {
      as: "extContact",
      foreignKey: "extContactTypeId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: EXT_CONTACT_TYPE_TABLE,
      modelName: EXT_CONTACT_TYPE_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default { EXT_CONTACT_TYPE_TABLE, ExtContactTypeSchema, ExtContactType };

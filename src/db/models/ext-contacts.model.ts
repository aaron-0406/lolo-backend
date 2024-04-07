import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ExtContactType } from "../../app/extrajudicial/types/ext-contact.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";
import clientModel from "./client.model";
import extContactTypeModel from "./ext-contact-type.model";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const EXT_CONTACT_TABLE = "EXT_CONTACT";

const ExtContactSchema: ModelAttributes<ExtContact, ExtContactType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_ext_contact",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING(50),
  },
  email: {
    allowNull: true,
    type: DataTypes.STRING(200),
  },
  state: {
    allowNull: false,
    type: DataTypes.TINYINT({ length: 1 }),
  },
  clientId: {
    allowNull: false,
    field: "client_id_client",
    type: DataTypes.INTEGER,
    references: {
      model: clientModel.CLIENT_TABLE,
      key: "id_client",
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
  extContactTypeId: {
    allowNull: false,
    field: "ext_contact_type_id_ext_contact_type",
    type: DataTypes.INTEGER,
    references: {
      model: extContactTypeModel.EXT_CONTACT_TYPE_TABLE,
      key: "id_ext_tag_group",
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

class ExtContact extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CLIENT, { as: "client" });
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.belongsTo(models.EXT_CONTACT_TYPE, {
      as: "extContactType",
      foreignKey: "extContactTypeId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: EXT_CONTACT_TABLE,
      modelName: EXT_CONTACT_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default { EXT_CONTACT_TABLE, ExtContactSchema, ExtContact };

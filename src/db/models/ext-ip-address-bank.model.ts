import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ExtIpAddressBankType } from "../../app/extrajudicial/types/ext-ip-address-bank.type";
import customerModel from "./customer.model";
import extOfficeModel from "./ext-office.model";

const EXT_IP_ADDRESS_BANK_TABLE = "EXT_IP_ADDRESS_BANK";

const ExtIpAddressBankSchema: ModelAttributes<
  ExtIpAddressBank,
  ExtIpAddressBankType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_ext_ip_address_bank",
    type: DataTypes.INTEGER,
  },
  addressName: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  ip: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  state: {
    allowNull: false,
    type: DataTypes.TINYINT({ length: 1 }),
  },
  customerId: {
    allowNull: false,
    field: "customer_id_customer",
    type: DataTypes.INTEGER,
    references: {
      model: customerModel.CUSTOMER_TABLE,
      key: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  officeId: {
    allowNull: false,
    field: "ext_office_id_ext_office",
    type: DataTypes.INTEGER,
    references: {
      model: extOfficeModel.EXT_OFFICE_TABLE,
      key: "id_ext_office",
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

class ExtIpAddressBank extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER, { as: "customer" });
    this.belongsTo(models.EXT_OFFICE, { as: "extOffice" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: EXT_IP_ADDRESS_BANK_TABLE,
      modelName: EXT_IP_ADDRESS_BANK_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default {
  EXT_IP_ADDRESS_BANK_TABLE,
  ExtIpAddressBankSchema,
  ExtIpAddressBank,
};

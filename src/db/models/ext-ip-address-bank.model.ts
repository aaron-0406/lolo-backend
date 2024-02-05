import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ExtIpAddressBankType } from "../../app/extrajudicial/types/ext-ip-address-bank.type";

const EXT_IP_ADDRESS_BANK_TABLE = "EXT_IP_ADDRESS_BANK";

const ExtIpAddressBankSchema: ModelAttributes<
  ExtIpAddressBank,
  ExtIpAddressBankType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_dash_ip_address_bank",
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
  static associate(models: { [key: string]: ModelCtor<Model> }) {}

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

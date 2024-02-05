import { DataTypes, QueryInterface } from "sequelize";
import extIpAddressBank from "../models/ext-ip-address-bank.model";

const { EXT_IP_ADDRESS_BANK_TABLE } = extIpAddressBank;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(EXT_IP_ADDRESS_BANK_TABLE, {
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
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(EXT_IP_ADDRESS_BANK_TABLE);
}

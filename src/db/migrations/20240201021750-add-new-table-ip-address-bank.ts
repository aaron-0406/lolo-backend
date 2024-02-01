import { DataTypes, QueryInterface } from "sequelize";
import dashIpAddressBank from "../models/dash-ip-address-bank.model";

const { DASH_IP_ADDRESS_BANK_TABLE } = dashIpAddressBank;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(DASH_IP_ADDRESS_BANK_TABLE, {
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
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(DASH_IP_ADDRESS_BANK_TABLE);
}

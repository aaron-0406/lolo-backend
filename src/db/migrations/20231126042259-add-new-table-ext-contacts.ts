import { DataTypes, QueryInterface } from "sequelize";
import extContactsModel from "../models/ext-contacts.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";
import clientModel from "../models/client.model";

const { EXT_CONTACT_TABLE } = extContactsModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { CLIENT_TABLE } = clientModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(EXT_CONTACT_TABLE, {
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
        model: CLIENT_TABLE,
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
  await queryInterface.dropTable(EXT_CONTACT_TABLE);
}

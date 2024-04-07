import { DataTypes, QueryInterface } from "sequelize";
import extContactTypeModel from "../models/ext-contact-type.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { EXT_CONTACT_TYPE_TABLE } = extContactTypeModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const newContactType = [
  {
    id_ext_contact_type: 1,
    contactType: "Fiador",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(EXT_CONTACT_TYPE_TABLE, {
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
  });

  await queryInterface.bulkInsert(EXT_CONTACT_TYPE_TABLE, newContactType);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(EXT_CONTACT_TYPE_TABLE);
}

import { DataTypes, QueryInterface } from "sequelize";
import extOfficeModel from "../models/ext-office.model";
import cityModel from "../models/city.model";
import customerModel from "../models/customer.model";
import customerUserModel from "../models/customer-user.model";
import extIpAddressBankModel from "../models/ext-ip-address-bank.model";

const { EXT_OFFICE_TABLE } = extOfficeModel;

const newOffice = [
  {
    id_ext_office: 1,
    name: "oficina en espera",
    address: "sin calle",
    city_id_city: 1,
    customer_id_customer: 1,
    state: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(EXT_OFFICE_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_ext_office",
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(200),
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(200),
    },
    cityId: {
      allowNull: false,
      field: "city_id_city",
      type: DataTypes.INTEGER,
      references: {
        model: cityModel.CITY_TABLE,
        key: "id_city",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
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

  await queryInterface.bulkInsert(EXT_OFFICE_TABLE, newOffice);

  await queryInterface.addConstraint(EXT_OFFICE_TABLE, {
    fields: ["city_id_city"],
    type: "foreign key",
    name: "fk_ext_office_city",
    references: {
      table: cityModel.CITY_TABLE,
      field: "id_city",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.addConstraint(EXT_OFFICE_TABLE, {
    fields: ["customer_id_customer"],
    type: "foreign key",
    name: "fk_ext_office_customer",
    references: {
      table: customerModel.CUSTOMER_TABLE,
      field: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.addColumn(
    customerUserModel.CUSTOMER_USER_TABLE,
    "ext_office_id_ext_office",
    {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  );

  await queryInterface.addColumn(
    extIpAddressBankModel.EXT_IP_ADDRESS_BANK_TABLE,
    "ext_office_id_ext_office",
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    }
  );

  await queryInterface.addConstraint(customerUserModel.CUSTOMER_USER_TABLE, {
    fields: ["ext_office_id_ext_office"],
    type: "foreign key",
    name: "fk_customer_user_ext_office",
    references: {
      table: EXT_OFFICE_TABLE,
      field: "id_ext_office",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.addConstraint(
    extIpAddressBankModel.EXT_IP_ADDRESS_BANK_TABLE,
    {
      fields: ["ext_office_id_ext_office"],
      type: "foreign key",
      name: "fk_ext_ip_address_bank_ext_office",
      references: {
        table: EXT_OFFICE_TABLE,
        field: "id_ext_office",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    }
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeConstraint(EXT_OFFICE_TABLE, "fk_ext_office_city");

  await queryInterface.removeConstraint(
    EXT_OFFICE_TABLE,
    "fk_ext_office_customer"
  );

  // await queryInterface.removeConstraint(
  //   extIpAddressBankModel.EXT_IP_ADDRESS_BANK_TABLE,
  //   "fk_ext_ip_address_bank_ext_office"
  // );

  await queryInterface.removeConstraint(
    customerUserModel.CUSTOMER_USER_TABLE,
    "fk_customer_user_ext_office"
  );

  // await queryInterface.removeColumn(
  //   extIpAddressBankModel.EXT_IP_ADDRESS_BANK_TABLE,
  //   "ext_office_id_ext_office"
  // );

  await queryInterface.removeColumn(
    customerUserModel.CUSTOMER_USER_TABLE,
    "ext_office_id_ext_office"
  );

  await queryInterface.dropTable(EXT_OFFICE_TABLE);
}

import { DataTypes, QueryInterface } from "sequelize";
import extAddressTypeModel from "../models/ext-address-type.model";
import directionModel from "../models/direction.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { EXT_ADDRESS_TYPE_TABLE } = extAddressTypeModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { DIRECTION_TABLE } = directionModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(EXT_ADDRESS_TYPE_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_address_type",
      type: DataTypes.INTEGER,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING(200),
      field: "address_type",
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

  await queryInterface.addConstraint(EXT_ADDRESS_TYPE_TABLE, {
    fields: ["customer_has_bank_id_customer_has_bank"],
    type: "foreign key",
    name: "fk_address_type_customer_has_bank",
    references: {
      table: CUSTOMER_HAS_BANK_TABLE,
      field: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.removeColumn(DIRECTION_TABLE, "type");

  await queryInterface.addColumn(
    DIRECTION_TABLE,
    "address_type_id_address_type",
    {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  );

  await queryInterface.sequelize.query(
    `ALTER TABLE DIRECTION MODIFY COLUMN address_type_id_address_type INT AFTER client_id_client`
  );

  await queryInterface.addConstraint(DIRECTION_TABLE, {
    fields: ["address_type_id_address_type"],
    type: "foreign key",
    name: "fk_direction_address_type",
    references: {
      table: EXT_ADDRESS_TYPE_TABLE,
      field: "id_address_type",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeConstraint(
    EXT_ADDRESS_TYPE_TABLE,
    "fk_address_type_customer_has_bank"
  );

  await queryInterface.dropTable(EXT_ADDRESS_TYPE_TABLE);

  await queryInterface.removeConstraint(
    DIRECTION_TABLE,
    "fk_direction_address_type"
  );

  await queryInterface.removeColumn(
    DIRECTION_TABLE,
    "management_action_id_management_action"
  );

  await queryInterface.addColumn(DIRECTION_TABLE, "type", {
    allowNull: false,
    type: DataTypes.STRING(200),
  });
}

import { DataTypes, QueryInterface } from "sequelize";
import managementActionModel from "../models/management-action.model";
import commentModel from "../models/comment.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { MANAGEMENT_ACTION_TABLE } = managementActionModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { COMMENT_TABLE } = commentModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(MANAGEMENT_ACTION_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_management_action",
      type: DataTypes.INTEGER,
    },
    codeAction: {
      allowNull: false,
      field: "code_action",
      type: DataTypes.STRING(10),
    },
    nameAction: {
      allowNull: false,
      field: "name_action",
      type: DataTypes.STRING(150),
    },
    codeSubTypeManagement: {
      allowNull: false,
      field: "code_sub_type_management",
      type: DataTypes.STRING(10),
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
  });

  await queryInterface.addConstraint(MANAGEMENT_ACTION_TABLE, {
    fields: ["customer_has_bank_id_customer_has_bank"],
    type: "foreign key",
    name: "fk_management_action_customer_has_bank",
    references: {
      table: CUSTOMER_HAS_BANK_TABLE,
      field: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.addColumn(
    COMMENT_TABLE,
    "management_action_id_management_action",
    {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  );

  await queryInterface.sequelize.query(
    `ALTER TABLE COMMENT MODIFY COLUMN management_action_id_management_action INT AFTER negotiation`
  );

  await queryInterface.addConstraint(COMMENT_TABLE, {
    fields: ["management_action_id_management_action"],
    type: "foreign key",
    name: "fk_comment_management_action",
    references: {
      table: MANAGEMENT_ACTION_TABLE,
      field: "id_management_action",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeConstraint(
    MANAGEMENT_ACTION_TABLE,
    "fk_management_action_customer_has_bank"
  );

  await queryInterface.dropTable(MANAGEMENT_ACTION_TABLE);

  await queryInterface.removeConstraint(
    COMMENT_TABLE,
    "fk_comment_management_action"
  );

  await queryInterface.removeColumn(
    COMMENT_TABLE,
    "management_action_id_management_action"
  );
}

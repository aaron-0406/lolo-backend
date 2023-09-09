import { QueryInterface } from "sequelize";
import customerUserModel from "../models/customer-user.model";
import rolesModel from "../models/roles.model";

const { CUSTOMER_USER_TABLE } = customerUserModel;
const { ROLE_TABLE } = rolesModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addConstraint(CUSTOMER_USER_TABLE, {
    fields: ["role_id_role"],
    type: "foreign key",
    name: "fk_customer-user_role",
    references: {
      table: ROLE_TABLE,
      field: "id_role",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeConstraint(
    CUSTOMER_USER_TABLE,
    "fk_customer-user_role"
  );
}

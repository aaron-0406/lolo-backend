import { QueryInterface, Op, DataTypes } from "sequelize";
import cityModel from "../models/city.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { CITY_TABLE } = cityModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(CITY_TABLE, "customer_has_bank_id", {
    allowNull: true,
    field: "customer_has_bank_id",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_HAS_BANK_TABLE,
      key: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(CITY_TABLE, "customer_has_bank_id");
}

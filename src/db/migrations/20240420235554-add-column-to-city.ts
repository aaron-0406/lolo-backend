import { QueryInterface, DataTypes } from "sequelize";
import cityModel from "../models/city.model";
import customerModel from "../models/customer.model";
import { CustomerType } from "../../app/dash/types/customer.type";

const { CITY_TABLE } = cityModel;
const { CUSTOMER_TABLE } = customerModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(CITY_TABLE, "customer_id_customer", {
    allowNull: false,
    defaultValue: 21,
    field: "customer_id_customer",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  for (let i = 1; i <= 2; i++) {
    await queryInterface.bulkUpdate(
      CITY_TABLE,
      { customer_id_customer: 1 },
      {
        id_city: i,
      }
    );
  }
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(CITY_TABLE, "customer_id_customer");
}

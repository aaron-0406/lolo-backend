import { DataTypes, QueryInterface } from "sequelize";
import productModel from "../models/product.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { PRODUCT_TABLE } = productModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(
    PRODUCT_TABLE,
    "customer_has_bank_id_customer_has_bank",
    {
      allowNull: true,
      field: "customer_has_bank_id_customer_has_bank",
      type: DataTypes.INTEGER,
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    }
  );

  await queryInterface.sequelize.query(
    `UPDATE PRODUCT p INNER JOIN CLIENT c ON c.id_client = p.client_id set p.customer_has_bank_id_customer_has_bank = c.customer_has_bank_id_customer_has_bank;
    `
  );

  await queryInterface.changeColumn(
    PRODUCT_TABLE,
    "customer_has_bank_id_customer_has_bank",
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(
    PRODUCT_TABLE,
    "customer_has_bank_id_customer_has_bank"
  );
}

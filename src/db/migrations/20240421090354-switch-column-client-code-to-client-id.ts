import { DataTypes, QueryInterface } from "sequelize";
import productModel from "../models/product.model";
import clientModel from "../models/client.model";

const { PRODUCT_TABLE } = productModel;
const { CLIENT_TABLE } = clientModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(PRODUCT_TABLE, "client_id", {
    type: DataTypes.INTEGER,
    allowNull: true,
  });
  await queryInterface.sequelize.query(
    `UPDATE product p INNER JOIN client c ON c.code = p.client_code_client set p.client_id = c.id_client;
    `
  );

  await queryInterface.addConstraint(PRODUCT_TABLE, {
    fields: ["client_id"],
    type: "foreign key",
    name: "client_id",
    references: {
      table: CLIENT_TABLE,
      field: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.removeConstraint(PRODUCT_TABLE, "PRODUCT_ibfk_1");
  await queryInterface.removeColumn(PRODUCT_TABLE, "client_code_client");
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(PRODUCT_TABLE, "client_id");
  await queryInterface.removeConstraint(PRODUCT_TABLE, "client_id");
}

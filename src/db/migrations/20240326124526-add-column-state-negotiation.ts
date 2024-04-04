import { DataTypes, QueryInterface } from "sequelize";
import productModel from "../models/product.model";
import negotiationModel from "../models/negotiation.model";

const { PRODUCT_TABLE } = productModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(PRODUCT_TABLE, "negotiation_id_negotiation", {
    allowNull: true,
    field: "negotiation_id_negotiation",
    type: DataTypes.INTEGER,
    references: {
      model: negotiationModel.NEGOTIATION_TABLE,
      key: "id_negotiation",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(
    PRODUCT_TABLE,
    "negotiation_id_negotiation"
  );
}

import sequelize from "../../libs/sequelize";
import { DataTypes, QueryInterface } from "sequelize";
import productModel from "../models/product.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { models } = sequelize;
const { PRODUCT_TABLE } = productModel;

export async function up(queryInterface: QueryInterface) {
  // await queryInterface.addColumn(
  //   PRODUCT_TABLE,
  //   "customer_has_bank_id_customer_has_bank",
  //   {
  //     allowNull: true,
  //     field: "customer_has_bank_id_customer_has_bank",
  //     type: DataTypes.INTEGER,
  //     references: {
  //       model: customerHasBankModel.CUSTOMER_HAS_BANK_TABLE,
  //       key: "id_customer_has_bank",
  //     },
  //     onUpdate: "CASCADE",
  //     onDelete: "NO ACTION",
  //   }
  // );

  const rta = await models.PRODUCT.findAll({
    attributes: { exclude: ["clientId"] },
    include: [
      {
        model: models.CLIENT,
        as: "client",
        attributes: ["customerHasBankId"],
      },
    ],
  });

  rta.forEach(async (record) => {
    const client = record.dataValues.client.dataValues;

    if (client && client.customerHasBankId !== null) {
      try {
        const product = await models.PRODUCT.findByPk(record.dataValues.id);
        if (product) {
          await product.update({
            ...product,
            customerHasBankId: client.customerHasBankId ?? null,
          });
        }
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    }
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(
    PRODUCT_TABLE,
    "customer_has_bank_id_customer_has_bank"
  );
}

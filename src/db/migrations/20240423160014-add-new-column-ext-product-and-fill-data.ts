import { DataTypes, QueryInterface } from "sequelize";
import productModel from "../models/product.model";
import extProductNameModel from "../models/ext-product-name.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { PRODUCT_TABLE } = productModel;
const { EXT_PRODUCT_NAME_TABLE } = extProductNameModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const newProductNames = [
  {
    id_ext_product_name: 1,
    product_name: "ADELANTO SUELDO ATRASO",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 2,
    product_name: "AMEX LAN CLASICA",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 3,
    product_name: "AMEX LAN PLATINUM",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 4,
    product_name: "AMEX ORO",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 5,
    product_name: "AMEX ORO LAN",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 6,
    product_name: "AMEX VERDE",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 7,
    product_name: "CTEORD",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 8,
    product_name: "EFECTIVO",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 9,
    product_name: "EFECTIVO DSCTO. POH",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 10,
    product_name: "EFECTIVO NEGOCIOS",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 11,
    product_name: "GARANTIA HIPOTECARIA",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 12,
    product_name: "HIPOTECARIO VIVIENDA",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 13,
    product_name: "HIPOTECARIO VIVIENDA REF",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 14,
    product_name: "HVIC",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 15,
    product_name: "MI VIVIENDA",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 16,
    product_name: "NEGOCIO COMERCIAL",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 17,
    product_name: "REFINANCIADO LETRAS",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 18,
    product_name: "REFINANCIADO PAGARES",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 19,
    product_name: "REPROGRAMADO CONSUMO",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 20,
    product_name: "REPROGRAMADO PYME",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 21,
    product_name: "SOLUCION NEGOCIOS",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 22,
    product_name: "VEHICULAR",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 23,
    product_name: "VISA CLASICA",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 24,
    product_name: "VISA CLASICA LAN",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 25,
    product_name: "VISA CLASICA MASIVA",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 26,
    product_name: "VISA EXACTA",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 27,
    product_name: "VISA ORO",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 28,
    product_name: "VISA ORO LAN",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 29,
    product_name: "VISA PLATINUM",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 30,
    product_name: "VISA PLATINUM LAN",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 31,
    product_name: "VISA SIGNATURE",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 32,
    product_name: "ADELANTO SUELDO ATRASO",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 33,
    product_name: "AMEX LAN CLASICA",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 34,
    product_name: "AMEX LAN PLATINUM",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 35,
    product_name: "AMEX ORO",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 36,
    product_name: "AMEX ORO LAN",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 37,
    product_name: "AMEX VERDE",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 38,
    product_name: "CTEORD",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 39,
    product_name: "EFECTIVO",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 40,
    product_name: "EFECTIVO DSCTO. POH",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 41,
    product_name: "EFECTIVO NEGOCIOS",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 42,
    product_name: "GARANTIA HIPOTECARIA",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 43,
    product_name: "HIPOTECARIO VIVIENDA",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 44,
    product_name: "HIPOTECARIO VIVIENDA REF",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 45,
    product_name: "HVIC",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 46,
    product_name: "MI VIVIENDA",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 47,
    product_name: "NEGOCIO COMERCIAL",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 48,
    product_name: "REFINANCIADO LETRAS",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 49,
    product_name: "REFINANCIADO PAGARES",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 50,
    product_name: "REPROGRAMADO CONSUMO",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 51,
    product_name: "REPROGRAMADO PYME",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 52,
    product_name: "SOLUCION NEGOCIOS",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 53,
    product_name: "VEHICULAR",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 54,
    product_name: "VISA CLASICA",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 55,
    product_name: "VISA CLASICA LAN",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 56,
    product_name: "VISA CLASICA MASIVA",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 57,
    product_name: "VISA EXACTA",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 58,
    product_name: "VISA ORO",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 59,
    product_name: "VISA ORO LAN",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 60,
    product_name: "VISA PLATINUM",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 61,
    product_name: "VISA PLATINUM LAN",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
  {
    id_ext_product_name: 62,
    product_name: "VISA SIGNATURE",
    customer_has_bank_id_customer_has_bank: 12,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(EXT_PRODUCT_NAME_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_ext_product_name",
      type: DataTypes.INTEGER,
    },
    productName: {
      field: "product_name",
      allowNull: false,
      type: DataTypes.STRING(200),
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

  await queryInterface.bulkInsert(EXT_PRODUCT_NAME_TABLE, newProductNames);

  await queryInterface.addColumn(
    PRODUCT_TABLE,
    "ext_product_name_id_ext_product_name",
    {
      allowNull: true,
      field: "ext_product_name_id_ext_product_name",
      type: DataTypes.INTEGER,
      references: {
        model: EXT_PRODUCT_NAME_TABLE,
        key: "id_ext_product_name",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    }
  );

  await queryInterface.sequelize.query(
    `UPDATE PRODUCT p INNER JOIN EXT_PRODUCT_NAME e ON e.customer_has_bank_id_customer_has_bank = p.customer_has_bank_id_customer_has_bank AND e.product_name = p.name
      set p.ext_product_name_id_ext_product_name = e.id_ext_product_name;
    `
  );

  await queryInterface.removeColumn(PRODUCT_TABLE, "name");
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(
    PRODUCT_TABLE,
    "ext_product_name_id_ext_product_name"
  );
  await queryInterface.dropTable(EXT_PRODUCT_NAME_TABLE);
}

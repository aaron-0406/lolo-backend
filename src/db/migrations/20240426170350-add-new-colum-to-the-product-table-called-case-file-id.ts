import { DataTypes, QueryInterface } from "sequelize";
import productModel from "../models/product.model";
import judicialCaseFileModel from "../models/judicial-case-file.model";

const { PRODUCT_TABLE } = productModel;
const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(
    PRODUCT_TABLE,
    "judicial_case_file_id_judicial_case_file",
    {
      allowNull: true,
      field: "judicial_case_file_id_judicial_case_file",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_CASE_FILE_TABLE,
        key: "id_judicial_case_file",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    }
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(
    PRODUCT_TABLE,
    "judicial_case_file_id_judicial_case_file"
  );
}

import { DataTypes, QueryInterface } from "sequelize";
import directionModel from "../models/direction.model";
import templateModel from "../models/template.model";
import ecampoModel from "../models/ecampo.model";
import templateHasValuesModel from "../models/many-to-many/template-has-values.model";
import valuesModel from "../models/values.model";

const { DIRECTION_TABLE } = directionModel;
const { TemplateSchema, TEMPLATE_TABLE } = templateModel;
const { ECampoSchema, ECAMPO_TABLE } = ecampoModel;
const { TemplateHasValuesSchema, TEMPLATE_HAS_VALUES_TABLE } =
  templateHasValuesModel;
const { ValuesSchema, VALUES_TABLE } = valuesModel;

export async function up(queryInterface: QueryInterface) {
  try {
    await queryInterface.addColumn(DIRECTION_TABLE, "type", {
      allowNull: false,
      type: DataTypes.STRING(200),
    });
  } catch (error) {}

  await queryInterface.createTable(TEMPLATE_TABLE, TemplateSchema);
  await queryInterface.createTable(ECAMPO_TABLE, ECampoSchema);
  await queryInterface.createTable(
    TEMPLATE_HAS_VALUES_TABLE,
    TemplateHasValuesSchema
  );
  await queryInterface.createTable(VALUES_TABLE, ValuesSchema);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(DIRECTION_TABLE, "type");

  await queryInterface.dropTable(TEMPLATE_HAS_VALUES_TABLE);
  await queryInterface.dropTable(TEMPLATE_TABLE);
  await queryInterface.dropTable(ECAMPO_TABLE);
  await queryInterface.dropTable(VALUES_TABLE);
}

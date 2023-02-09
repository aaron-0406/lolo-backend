import { QueryInterface } from "sequelize";
import templateImgModel from "../models/template-img.model";
const { TemplateImgSchema, TEMPLATE_IMG_TABLE } = templateImgModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(TEMPLATE_IMG_TABLE, TemplateImgSchema);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable(TEMPLATE_IMG_TABLE);

}

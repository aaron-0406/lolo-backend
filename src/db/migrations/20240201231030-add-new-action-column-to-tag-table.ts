import { DataTypes, QueryInterface } from "sequelize";
import extTagModel from "../models/ext-tag.model";

const { EXT_TAG_TABLE } = extTagModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(EXT_TAG_TABLE, "action", {
    allowNull: false,
    type: DataTypes.TINYINT({ length: 1 }),
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(EXT_TAG_TABLE, "action");
}

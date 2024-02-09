import { DataTypes, QueryInterface } from "sequelize";
import fileModel from "../models/file.model";
import extTagModel from "../models/ext-tag.model";

const { FILE_TABLE } = fileModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.addColumn(FILE_TABLE, "tag_id", {
    allowNull: true,
    field: "tag_id",
    type: DataTypes.INTEGER,
    references: {
      model: extTagModel.EXT_TAG_TABLE,
      key: "id_ext_tag",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(FILE_TABLE, "tag_id");
}

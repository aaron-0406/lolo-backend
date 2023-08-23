import { DataTypes, QueryInterface } from "sequelize";
import commentModel from "../models/comment.model";

const { COMMENT_TABLE } = commentModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.changeColumn(COMMENT_TABLE, "comment", {
    type: DataTypes.TEXT("long"),
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.changeColumn(COMMENT_TABLE, "comment", {
    type: DataTypes.STRING(400),
  });
}

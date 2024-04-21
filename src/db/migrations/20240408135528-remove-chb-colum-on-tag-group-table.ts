import { QueryInterface } from "sequelize";
import extTagGroupModel from "../models/ext-tag-group.model";

const { EXT_TAG_GROUP_TABLE } = extTagGroupModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.removeColumn(
    EXT_TAG_GROUP_TABLE,
    "customer_has_bank_id_customer_has_bank"
  );
}

export async function down(queryInterface: QueryInterface) {
  //
}

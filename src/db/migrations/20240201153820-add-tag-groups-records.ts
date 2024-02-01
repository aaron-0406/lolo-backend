import { QueryInterface, Op } from "sequelize";
import extTagGroupModel from "../models/ext-tag-group.model";

const { EXT_TAG_GROUP_TABLE } = extTagGroupModel;

const newTagGroups = [
  {
    name: "Archivos",
    customerHasBankId: 1,
  },
  {
    name: "Productos",
    customerHasBankId: 1,
  },
  {
    name: "Clientes",
    customerHasBankId: 1,
  },
];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(EXT_TAG_GROUP_TABLE, newTagGroups);
}

export async function down(queryInterface: QueryInterface) {
  // INFO: DON'T DELETE RECORDS
}

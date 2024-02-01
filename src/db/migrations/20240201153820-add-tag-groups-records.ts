import { QueryInterface, Op } from "sequelize";
import extTagGroupModel from "../models/ext-tag-group.model";

const { EXT_TAG_GROUP_TABLE } = extTagGroupModel;

const newTagGroups = [
  {
    name: "Archivos",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: "2024-02-01 03:33:31",
    updated_at: "2024-02-01 03:33:31",
  },
  {
    name: "Productos",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: "2024-02-01 03:33:31",
    updated_at: "2024-02-01 03:33:31",
  },
  {
    name: "Clientes",
    customer_has_bank_id_customer_has_bank: 1,
    created_at: "2024-02-01 03:33:31",
    updated_at: "2024-02-01 03:33:31",
  },
];

export async function up(queryInterface: QueryInterface) {
  await queryInterface.bulkInsert(EXT_TAG_GROUP_TABLE, newTagGroups);
}

export async function down(queryInterface: QueryInterface) {
  // INFO: DON'T DELETE RECORDS
}

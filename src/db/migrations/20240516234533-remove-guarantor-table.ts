import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.dropTable("GUARANTOR");
}

export async function down(queryInterface: QueryInterface) {}

import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query(
    "UPDATE permission SET link = '/cobranza/:urlIdentifier/clientes/:code/archivos' WHERE code = 'P02-02-03'"
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query(
    "UPDATE permission SET link = '#' WHERE code = 'P02-02-03'"
  );
}

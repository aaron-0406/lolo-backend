import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query(
    "UPDATE permission SET link = '/cobranza/:urlIdentifier/clientes/:code/direcciones' WHERE code = 'P02-02-05'"
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query(
    "UPDATE permission SET link = '#' WHERE code = 'P02-02-05'"
  );
}

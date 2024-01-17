import { QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query(
    "UPDATE PERMISSION SET link = '/cobranza/:urlIdentifier/clientes/:code/productos' WHERE code = 'P02-02-06'"
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query(
    "UPDATE PERMISSION SET link = '#' WHERE code = 'P02-02-06'"
  );
}

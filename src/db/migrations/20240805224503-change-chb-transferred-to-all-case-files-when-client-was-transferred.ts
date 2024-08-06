import { QueryInterface, QueryTypes } from "sequelize";
import clientModel from "../models/client.model";
import judicialCaseFileModel from "../models/judicial-case-file.model";

const { CLIENT_TABLE } = clientModel;
const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;

export async function up(queryInterface: QueryInterface) {
  const results = await queryInterface.sequelize.query(
    `SELECT id_client, chb_transferred FROM ${CLIENT_TABLE} WHERE chb_transferred IS NOT NULL`,
    { type: QueryTypes.SELECT }
  );

  if (Array.isArray(results) && results.length > 0) {
    await Promise.all(
      results.map(async (r: any) => {
        await queryInterface.sequelize.query(
          `UPDATE ${JUDICIAL_CASE_FILE_TABLE} SET chb_transferred = :chb_transferred WHERE client_id_client = :id_client`,
          {
            replacements: {
              chb_transferred: r.chb_transferred,
              id_client: r.id_client,
            },
          }
        );
      })
    );
  }
}

export async function down(queryInterface: QueryInterface) {
  return queryInterface.sequelize.query(
    `UPDATE ${JUDICIAL_CASE_FILE_TABLE} SET chb_transferred = customer_has_bank_id WHERE customer_has_bank_id IS NOT NULL AND chb_transferred IS NOT NULL`
  );
}

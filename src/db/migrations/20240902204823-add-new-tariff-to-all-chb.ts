import { QueryInterface, QueryTypes } from "sequelize";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";
import tariffModel from "../models/settings/tariff.model";
import tariffIntervalMatchModel from "../models/settings/tariff-interval-match.model";

const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { TARIFF_TABLE } = tariffModel;
const { TARIFF_INTERVAL_MATCH_TABLE} = tariffIntervalMatchModel

const tariff = [
  { code:"07900", type:"PROCESOS CONTENCIOSOS", description:"Por ofrecimiento de pruebas en: las demandas, excepciones, defensas previas, contestaciones de demandas, reconvenciones, denuncia civil, intervención, exclusión y sucesión procesal, calificación de títulos ejecutivos o de ejecución, la actuación de prueba anticipada, las contradicciones, tercería, observación por parte del obligado a la liquidación de pericias laborales y/o devengados en los procesos de alimentos, observación a la tasación de bienes muebles e inmuebles a ser rematados y por ofrecimiento de nuevos medios probatorios."},
  { code:"07439", type:"PROCESOS CONTENCIOSOS", description:"Por solicitud de nulidad de actos procesales."},
  { code:"07927", type:"PROCESOS CONTENCIOSOS", description:"Por recurso de apelación de autos." },
  { code:"07935", type:"PROCESOS CONTENCIOSOS", description:"Por recurso de apelación de sentencias."},
  { code:"07951", type:"PROCESOS CONTENCIOSOS", description:"Por recurso de nulidad y casación." },
  { code:"07943", type:"PROCESOS CONTENCIOSOS", description:"Por recurso de queja."},
  { code:"07978", type:"PROCESOS CONTENCIOSOS", description:"Por diligencias a realizarse fuera del local judicial"},
  { code:"08168", type:"PROCESOS CONTENCIOSOS", description:"Por formas especiales de conclusión del proceso: allanamiento y reconocimiento, transacción judicial, desistimiento en cualquiera de sus modalidades y por suspensión convencional del proceso." },
  { code:"07374", type:"PROCESOS CONTENCIOSOS", description:"Por otorgamiento de poder por acta." },

  { code:"08222", type:"POR SOLICITUD DE", description:"Medidas Cautelares en todas sus modalidades, anotaciones de demandas en todos los procesos, embargos en ejecución forzada, solicitud de requerimiento judicial de incautación. * Cuando se soliciten medidas cautelares, cuyos procesos judiciales tengan una cuantía inferior a las 10 URP, estarán exoneradas de dicho pago."},
  { code:"08223", type:"POR SOLICITUD DE", description:"Laudo Arbitral (actos procesales en fuero judicial): recurso de anulación de laudo, contestación de recurso de anulación, ejecución de laudo en vía judicial, oposición contra mandato de ejecución y pedido de suspensión de laudo arbitral; solicitudes de medidas cautelares en ejecución de laudo en todas sus modalidades, recurso de casación."},
  { code:"08079", type:"POR SOLICITUD DE", description:"Solicitud de remate judicial." },

  { code:"PTE-00003-01", type:"POR TRAMITE DE EXHORTO",  description:"Copia literal"},
  { code:"PTE-00003-02", type:"POR TRAMITE DE EXHORTO", description:"Certificado de gravamen"},
  { code:"PTE-00003-03", type:"POR TRAMITE DE EXHORTO", description:"Busquedas registral a nivel nacional"},
  { code:"PTE-00003-04", type:"POR TRAMITE DE EXHORTO", description:"Gastos prejudiciales"},
  { code: "08990", type: "POR TRAMITE DE EXHORTO", description: "EXPEDICION DE PARTES JUDICIALES" },
  { code:"08214-01", type:"POR TRAMITE DE EXHORTO", description:"Dentro del distrito judicial"},
  { code:"08214-02", type:"POR TRAMITE DE EXHORTO", description:"Otro distrito judicial"},
  { code:"08214-03", type:"POR TRAMITE DE EXHORTO", description:"Al extranjero"},
  { code:"09970", type:"POR TRAMITE DE EXHORTO", description:"Costo por Derecho de Notificación Judicial para el año 2024"},
  { code:"07375", type:"POR TRAMITE DE EXHORTO", description:"Publicación de Edicto Judicial Electrónico"},

  { code:"TP-00004-01", type:"TARIFA PERSONALIZADA", description:"Deposito judicial"},
  { code:"TP-00004-02", type:"TARIFA PERSONALIZADA", description:"Gasto registral"},
  { code:"TP-00004-03", type:"TARIFA PERSONALIZADA", description:"Publicación en periodico"},
  { code:"TP-00004-04", type:"TARIFA PERSONALIZADA", description:"Pago a perito"},
  { code:"TP-00004-05", type:"TARIFA PERSONALIZADA", description:"Pago a curador judicicial"},
  { code:"TP-00004-06", type:"TARIFA PERSONALIZADA", description:"Pago a martillero"},
  { code:"TP-00004-07", type:"TARIFA PERSONALIZADA", description:"REINTEGRO"},
]

const tariffIntervalMatch = [
  // PROCESOS CONTENCIOSOS

  { tariff_id: 1, interval_id: 1, value: 51.5 },
  { tariff_id: 1, interval_id: 2, value: 77.2 },
  { tariff_id: 1, interval_id: 3, value: 103.0 },
  { tariff_id: 1, interval_id: 4, value: 128.7 },
  { tariff_id: 1, interval_id: 5, value: 154.5 },
  { tariff_id: 1, interval_id: 6, value: 231.7 },
  { tariff_id: 1, interval_id: 7, value: 463.5 },
  { tariff_id: 1, interval_id: 8, value: 695.2 },
  { tariff_id: 1, interval_id: 9, value: 772.5 },
  { tariff_id: 1, interval_id: 10, value: 927.0 },

  { tariff_id: 2, interval_id: 1, value: 51.5 },
  { tariff_id: 2, interval_id: 2, value: 56.6 },
  { tariff_id: 2, interval_id: 3, value: 61.8 },
  { tariff_id: 2, interval_id: 4, value: 72.1 },
  { tariff_id: 2, interval_id: 5, value: 82.4 },
  { tariff_id: 2, interval_id: 6, value: 92.7 },
  { tariff_id: 2, interval_id: 7, value: 103.0 },
  { tariff_id: 2, interval_id: 8, value: 113.3 },
  { tariff_id: 2, interval_id: 9, value: 123.6 },
  { tariff_id: 2, interval_id: 10, value: 133.9 },

  { tariff_id: 3, interval_id: 1, value: 51.5 },
  { tariff_id: 3, interval_id: 2, value: 77.2 },
  { tariff_id: 3, interval_id: 3, value: 103.0 },
  { tariff_id: 3, interval_id: 4, value: 128.7 },
  { tariff_id: 3, interval_id: 5, value: 154.5 },
  { tariff_id: 3, interval_id: 6, value: 231.7 },
  { tariff_id: 3, interval_id: 7, value: 463.5 },
  { tariff_id: 3, interval_id: 8, value: 695.2 },
  { tariff_id: 3, interval_id: 9, value: 772.5 },
  { tariff_id: 3, interval_id: 10, value: 927.0 },

  { tariff_id: 4, interval_id: 1, value: 206.0 },
  { tariff_id: 4, interval_id: 2, value: 309.0 },
  { tariff_id: 4, interval_id: 3, value: 412.0 },
  { tariff_id: 4, interval_id: 4, value: 515.0 },
  { tariff_id: 4, interval_id: 5, value: 618.0 },
  { tariff_id: 4, interval_id: 6, value: 927.0 },
  { tariff_id: 4, interval_id: 7, value: 1854.0 },
  { tariff_id: 4, interval_id: 8, value: 2781.0 },
  { tariff_id: 4, interval_id: 9, value: 3708.0 },
  { tariff_id: 4, interval_id: 10, value: 4635.0 },

  { tariff_id: 5, interval_id: 1, value: 824.0 },
  { tariff_id: 5, interval_id: 2, value: 927.0 },
  { tariff_id: 5, interval_id: 3, value: 1030.0 },
  { tariff_id: 5, interval_id: 4, value: 1287.5 },
  { tariff_id: 5, interval_id: 5, value: 1545.0 },
  { tariff_id: 5, interval_id: 6, value: 2317.5 },
  { tariff_id: 5, interval_id: 7, value: 4480.5 },
  { tariff_id: 5, interval_id: 8, value: 6695.0 },
  { tariff_id: 5, interval_id: 9, value: 10300.0 },
  { tariff_id: 5, interval_id: 10, value: 18025.0 },

  { tariff_id: 6, interval_id: 1, value: 128.7 },
  { tariff_id: 6, interval_id: 2, value: 193.1 },
  { tariff_id: 6, interval_id: 3, value: 257.5 },
  { tariff_id: 6, interval_id: 4, value: 321.8 },
  { tariff_id: 6, interval_id: 5, value: 386.2 },
  { tariff_id: 6, interval_id: 6, value: 579.3 },
  { tariff_id: 6, interval_id: 7, value: 1158.7 },
  { tariff_id: 6, interval_id: 8, value: 1738.1 },
  { tariff_id: 6, interval_id: 9, value: 2060.0 },
  { tariff_id: 6, interval_id: 10, value: 2575.0 },

  { tariff_id: 7, interval_id: 1, value: 257.5 },
  { tariff_id: 7, interval_id: 2, value: 386.2 },
  { tariff_id: 7, interval_id: 3, value: 515.0 },
  { tariff_id: 7, interval_id: 4, value: 643.7 },
  { tariff_id: 7, interval_id: 5, value: 772.5 },
  { tariff_id: 7, interval_id: 6, value: 1158.7 },
  { tariff_id: 7, interval_id: 7, value: 2317.5 },
  { tariff_id: 7, interval_id: 8, value: 2575.0 },
  { tariff_id: 7, interval_id: 9, value: 2832.5 },
  { tariff_id: 7, interval_id: 10, value: 3090.0 },

  { tariff_id: 8, interval_id: 1, value: 144.2 },
  { tariff_id: 8, interval_id: 2, value: 200.8 },
  { tariff_id: 8, interval_id: 3, value: 257.5 },
  { tariff_id: 8, interval_id: 4, value: 360.5 },
  { tariff_id: 8, interval_id: 5, value: 463.5 },
  { tariff_id: 8, interval_id: 6, value: 927.0 },
  { tariff_id: 8, interval_id: 7, value: 1390.5 },
  { tariff_id: 8, interval_id: 8, value: 2111.5 },
  { tariff_id: 8, interval_id: 9, value: 2575.0 },
  { tariff_id: 8, interval_id: 10, value: 3090.0 },

  { tariff_id: 9, interval_id: 1, value: 51.5 },
  { tariff_id: 9, interval_id: 2, value: 51.5 },
  { tariff_id: 9, interval_id: 3, value: 51.5 },
  { tariff_id: 9, interval_id: 4, value: 51.5 },
  { tariff_id: 9, interval_id: 5, value: 103.0 },
  { tariff_id: 9, interval_id: 6, value: 103.0 },
  { tariff_id: 9, interval_id: 7, value: 103.0 },
  { tariff_id: 9, interval_id: 8, value: 103.0 },
  { tariff_id: 9, interval_id: 9, value: 154.5 },
  { tariff_id: 9, interval_id: 10, value: 154.5 },

  // POR SOLICITUD DE

  { tariff_id: 10, interval_id: 11, value: 515.0 },
  { tariff_id: 10, interval_id: 12, value: 1030.0 },
  { tariff_id: 10, interval_id: 13, value: 1545.0 },
  { tariff_id: 10, interval_id: 14, value: 2360.0 },
  { tariff_id: 10, interval_id: 15, value: 2575.0 },
  { tariff_id: 10, interval_id: 16, value: 3090.0 },
  { tariff_id: 10, interval_id: 17, value: 4120.0 },
  { tariff_id: 10, interval_id: 18, value: 6437.5 },
  { tariff_id: 10, interval_id: 19, value: 8497.5 },

  { tariff_id: 11, interval_id: 11, value: 515.0 },
  { tariff_id: 11, interval_id: 12, value: 1030.0 },
  { tariff_id: 11, interval_id: 13, value: 1545.0 },
  { tariff_id: 11, interval_id: 14, value: 2360.0 },
  { tariff_id: 11, interval_id: 15, value: 2575.0 },
  { tariff_id: 11, interval_id: 16, value: 3090.0 },
  { tariff_id: 11, interval_id: 17, value: 4120.0 },
  { tariff_id: 11, interval_id: 18, value: 6437.5 },
  { tariff_id: 11, interval_id: 19, value: 10300.0 },

  { tariff_id: 12, interval_id: 11, value: 515.0 },
  { tariff_id: 12, interval_id: 12, value: 1030.0 },
  { tariff_id: 12, interval_id: 13, value: 1545.0 },
  { tariff_id: 12, interval_id: 14, value: 2360.0 },
  { tariff_id: 12, interval_id: 15, value: 2575.0 },
  { tariff_id: 12, interval_id: 16, value: 3090.0 },
  { tariff_id: 12, interval_id: 17, value: 4120.0 },
  { tariff_id: 12, interval_id: 18, value: 6437.5 },
  { tariff_id: 12, interval_id: 19, value: 8497.5 },

  // POR TRAMITE DE EXHORTO

  { tariff_id: 13, interval_id: 20, value: 51.5 },
  { tariff_id: 14, interval_id: 20, value: 103.0 },
  { tariff_id: 15, interval_id: 20, value: 257.5 },
  { tariff_id: 16, interval_id: 20, value: 5.3 },
  { tariff_id: 17, interval_id: 20, value: 32.0 },
  { tariff_id: 18, interval_id: 20, value: 150.0 },
  { tariff_id: 19, interval_id: 20, value: 100.0 },
  { tariff_id: 20, interval_id: 20, value: 115.0 },
  { tariff_id: 21, interval_id: 20, value: 450.0 },
  { tariff_id: 22, interval_id: 20, value: 51.5 },

  // TARIFA PERSONALIZADA

  { tariff_id: 23, interval_id: 20, value: 0.0 },
  { tariff_id: 24, interval_id: 20, value: 0.0 },
  { tariff_id: 25, interval_id: 20, value: 0.0 },
  { tariff_id: 26, interval_id: 20, value: 0.0 },
  { tariff_id: 27, interval_id: 20, value: 0.0 },
  { tariff_id: 28, interval_id: 20, value: 0.0 },
  { tariff_id: 29, interval_id: 20, value: 0.0 },
];



export async function up(queryInterface: QueryInterface) {
  try {
    const [customerHasBanks] = await queryInterface.sequelize.query(
      `SELECT id_customer_has_bank FROM ${CUSTOMER_HAS_BANK_TABLE} WHERE id_customer_has_bank IS NOT NULL AND id_customer_has_bank != 1`
    );

    if (!customerHasBanks.length) return;

    await Promise.all(
      customerHasBanks.map(async (customerHasBank: any) => {
        const newTariffs = tariff.map((tariff: any) => ({
          ...tariff,
          customer_has_bank_id_customer_has_bank: customerHasBank.id_customer_has_bank,
        }));

        await queryInterface.bulkInsert(TARIFF_TABLE, newTariffs);

        const tariffId:any[] = await queryInterface.sequelize.query(
          `SELECT id_tariff FROM ${TARIFF_TABLE} WHERE customer_has_bank_id_customer_has_bank = ${customerHasBank.id_customer_has_bank}`,
          { type: QueryTypes.SELECT }
        );

        const newTariffInterMatch: any[] = [];

        if (!Array.isArray(tariffId)) return;

        for (let i = 0; i < 29; i++) {
          if (tariffId[i]?.id_tariff !== undefined) {
            const findIntervals = tariffIntervalMatch.filter(
              (item: any) => item.tariff_id === i + 1
            );

            if (!findIntervals.length) return;

            findIntervals.forEach((item: any) => {
              newTariffInterMatch.push({
                ...item,
                tariff_id: tariffId[i]?.id_tariff,
              });
            });
          }
        }

        await queryInterface.bulkInsert(TARIFF_INTERVAL_MATCH_TABLE, newTariffInterMatch);
      })
    );
  } catch (error) {
    console.log(error);
  }
}

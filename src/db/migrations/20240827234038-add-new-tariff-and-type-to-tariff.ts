import { QueryInterface } from "sequelize"
import tariffModel from "../models/tariff.model";
import tariffIntervalModel from "../models/tariff-interval.model";
import tariffIntervalMatchModel from "../models/tariff-interval-match.model";

const { TARIFF_TABLE } = tariffModel;
const { TARIFF_INTERVAL_TABLE } = tariffIntervalModel;
const { TARIFF_INTERVAL_MATCH_TABLE } = tariffIntervalMatchModel;

const tariff = [
  { code:"PTE-00003-01", type:"POR TRAMITE DE EXHORTO", description:"Copia literal"},
  { code:"PTE-00003-02", type:"POR TRAMITE DE EXHORTO", description:"Certificado de gravamen"},
  { code:"PTE-00003-03", type:"POR TRAMITE DE EXHORTO", description:"Busquedas registral a nivel nacional"},
  { code:"PTE-00003-04", type:"POR TRAMITE DE EXHORTO", description:"Gastos prejudiciales"},

  { code:"TP-00004-01", type:"TARIFA PERSONALIZADA", description:"Deposito judicial"},
  { code:"TP-00004-02", type:"TARIFA PERSONALIZADA", description:"Gasto registral"},
  { code:"TP-00004-03", type:"TARIFA PERSONALIZADA", description:"Publicación en periodico"},
  { code:"TP-00004-04", type:"TARIFA PERSONALIZADA", description:"Pago a perito"},
  { code:"TP-00004-05", type:"TARIFA PERSONALIZADA", description:"Pago a curador judicicial"},
  { code:"TP-00004-06", type:"TARIFA PERSONALIZADA", description:"Pago a martillero"},
]

const tariffInterval = [
  { description: 'Asignado a intervalo', interval: "[null, null]", interval_description: 'Asignado a intervalo de tarifas' },
]

const tariffIntervalMatch = [
  { tariff_id: 18, interval_id: 20, value: 150.00 },
  { tariff_id: 19, interval_id: 20, value: 100.00 },
  { tariff_id: 20, interval_id: 20, value: 115.00 },
  { tariff_id: 21, interval_id: 20, value: 450.00 },
  { tariff_id: 22, interval_id: 20, value: 0.00 },
  { tariff_id: 23, interval_id: 20, value: 0.00 },
  { tariff_id: 24, interval_id: 20, value: 0.00 },
  { tariff_id: 25, interval_id: 20, value: 0.00 },
  { tariff_id: 26, interval_id: 20, value: 0.00 },
  { tariff_id: 27, interval_id: 20, value: 0.00 },
]

export async function up(queryInterface: QueryInterface) {
  try {
    await queryInterface.bulkInsert(TARIFF_TABLE, tariff);
    await queryInterface.bulkInsert(TARIFF_INTERVAL_TABLE, tariffInterval);
    await queryInterface.bulkInsert(
      TARIFF_INTERVAL_MATCH_TABLE,
      tariffIntervalMatch
    );
  } catch (error) {
    console.log(error)
  }
}

export async function down(queryInterface: QueryInterface) {
  try {
    await queryInterface.bulkDelete(TARIFF_TABLE, tariff);
    await queryInterface.bulkDelete(TARIFF_INTERVAL_TABLE, tariffInterval);
    await queryInterface.bulkDelete(
      TARIFF_INTERVAL_MATCH_TABLE,
      tariffIntervalMatch,
    );
  } catch (error) {
    console.log(error)
  }}
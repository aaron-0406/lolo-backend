import { QueryInterface } from "sequelize"
import tariffModel from "../models/tariff.model";
import tariffIntervalModel from "../models/tariff-interval.model";
import tariffIntervalMatchModel from "../models/tariff-interval-match.model";

const { TARIFF_TABLE } = tariffModel;
const { TARIFF_INTERVAL_TABLE } = tariffIntervalModel;
const { TARIFF_INTERVAL_MATCH_TABLE } = tariffIntervalMatchModel;

const tariff = [
  { code:"08214-01", type:"POR TRAMITE DE EXHORTO", description:"Dentro del distrito judicial"},
  { code:"08214-02", type:"POR TRAMITE DE EXHORTO", description:"Otro distrito judicial"},
  { code:"08214-03", type:"POR TRAMITE DE EXHORTO", description:"Al extranjero"},
  { code:"09970", type:"POR TRAMITE DE EXHORTO", description:"Costo por Derecho de Notificación Judicial para el año 2024"},
  { code:"07375", type:"POR TRAMITE DE EXHORTO", description:"Publicación de Edicto Judicial Electrónico"},
]

const tariffInterval = [
  { description: 'Asignado a intervalo', interval: "[null, null]", interval_description: 'Asignado a intervalo de tarifas' },
]

const tariffIntervalMatch = [
  { tariff_id: 13, interval_id: 20, value: 51.50 },
  { tariff_id: 14, interval_id: 20, value: 103.00 },
  { tariff_id: 15, interval_id: 20, value: 257.50 },
  { tariff_id: 16, interval_id: 20, value: 5.30 },
  { tariff_id: 17, interval_id: 20, value: 32.00 },
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


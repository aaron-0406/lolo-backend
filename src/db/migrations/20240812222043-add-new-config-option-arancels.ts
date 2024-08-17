import { QueryInterface, Op, DataTypes } from 'sequelize';
import permissionModel from "../models/permission.model";
import judicialBinnacleModel from '../models/judicial-binnacle.model';
import tariffModel from '../models/tariff.model';
import tariffIntervalModel from '../models/tariff-interval.model';
import tariffIntervalMatchModel from '../models/tariff-interval-match.model';

const { PERMISSION_TABLE } = permissionModel;
const { JUDICIAL_BINNACLE_TABLE } = judicialBinnacleModel;
const { TARIFF_TABLE } = tariffModel;
const { TARIFF_INTERVAL_TABLE } = tariffIntervalModel;
const { TARIFF_INTERVAL_MATCH_TABLE } = tariffIntervalMatchModel;

const newPermissions = [
  {
    name:"CUADRO DE ARANCELES",
    code:"P43",
    icon:"ri-coin-fill",
    link:"/configuracion/:urlIdentifier/cuadro-aranceles",
    id_permission_main: 185,
  }
]



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
]

const tariffInterval = [
  // PROCESOS CONTENCIOSOS
  { description: 'HASTA 100 URP O CUANTÍA INDETERMINABLE', interval: "[null, 51500]", interval_description: 'HASTA S/ 51,500' },
  { description: 'MÁS 100 URP HASTA 250 URP', interval: "[51500, 128750]", interval_description: 'MÁS S/ 51,500 A S/ 128,750' },
  { description: 'MÁS 250 URP HASTA 500 URP', interval: "[128750, 257500]", interval_description: 'MÁS S/ 128,750 A S/ 257,500' },
  { description: 'MÁS 500 URP HASTA 750 URP', interval: "[257500, 386250]", interval_description: 'MÁS S/ 257,500 A S/ 386,250' },
  { description: 'MÁS 750 URP HASTA 1250 URP', interval: "[386250, 643750]", interval_description: 'MÁS S/ 386,250 A S/ 643,750' },
  { description: 'MÁS 1250 URP HASTA 2000 URP', interval: "[643750, 1030000]", interval_description: 'MÁS S/ 643,750 A S/ 1\'030,000' },
  { description: 'MÁS 2000 URP HASTA 3000 URP', interval: "[1030000, 1545000]", interval_description: 'MÁS S/ 1\'030,000 A S/ 1\'545,000' },
  { description: 'MÁS 3000 URP HASTA 3500 URP', interval: "[1545000, 1802500]", interval_description: 'MÁS DE S/ 1\'545,000 A S/ 1\'802,500' },
  { description: 'MÁS 3500 URP HASTA 4500 URP', interval: "[1802500, 2317500]", interval_description: 'MÁS S/ 1\'802,500 A S/ 2\'317,500' },
  { description: 'MÁS 4500 URP', interval: "[2317500, null]", interval_description: 'MÁS DE S/ 2\'317,500' },

  // POR SOLICITUD DE
  { description: 'HASTA 100 URP O CUANTÍA INDETERMINABLE', interval: "[null, 51500]", interval_description: 'HASTA S/ 51,500' },
  { description: 'MÁS 100 URP HASTA 200 URP', interval: "[51500, 103000]", interval_description: 'MÁS S/ 51,500 A S/ 103,000' },
  { description: 'MÁS 200 URP HASTA 300 URP', interval: "[103000, 154500]", interval_description: 'MÁS S/ 103,000 A S/ 154,500' },
  { description: 'MÁS 300 URP HASTA 600 URP', interval: "[154500, 309000]", interval_description: 'MÁS S/ 154,500 A S/ 309,000' },
  { description: 'MÁS 600 URP HASTA 1000 URP', interval: "[309000, 515000]", interval_description: 'MÁS S/ 309,000 A S/ 515,000' },
  { description: 'MÁS 1000 URP HASTA 2000 URP', interval: "[515000, 1030000]", interval_description: 'MÁS S/ 515,000 A S/ 1\'030,000' },
  { description: 'MÁS 2000 URP HASTA 3000 URP', interval: "[1030000, 1545000]", interval_description: 'MÁS S/ 1\'030,000 A S/ 1\'545,000' },
  { description: 'MÁS 3000 URP HASTA 3500 URP', interval: "[1545000, 1802500]", interval_description: 'MÁS DE S/ 1\'545,000 A S/ 1\'802,500' },
  { description: 'MÁS de 3500 URP', interval: "[1802500, null]", interval_description: 'MÁS DE S/ 1\'802,500' },
]

const tariffIntervalMatch = [

  // PROCESOS CONTENCIOSOS

  { tariff_id: 1, interval_id: 1, value: 51.50 },
  { tariff_id: 1, interval_id: 2, value: 77.20 },
  { tariff_id: 1, interval_id: 3, value: 103.00 },
  { tariff_id: 1, interval_id: 4, value: 128.70 },
  { tariff_id: 1, interval_id: 5, value: 154.50 },
  { tariff_id: 1, interval_id: 6, value: 231.70 },
  { tariff_id: 1, interval_id: 7, value: 463.50 },
  { tariff_id: 1, interval_id: 8, value: 695.20 },
  { tariff_id: 1, interval_id: 9, value: 772.50 },
  { tariff_id: 1, interval_id: 10, value: 927.00 },

  { tariff_id: 2, interval_id: 1, value: 51.50 },
  { tariff_id: 2, interval_id: 2, value: 56.60 },
  { tariff_id: 2, interval_id: 3, value: 61.80 },
  { tariff_id: 2, interval_id: 4, value: 72.10 },
  { tariff_id: 2, interval_id: 5, value: 82.40 },
  { tariff_id: 2, interval_id: 6, value: 92.70 },
  { tariff_id: 2, interval_id: 7, value: 103.00 },
  { tariff_id: 2, interval_id: 8, value: 113.30 },
  { tariff_id: 2, interval_id: 9, value: 123.60 },
  { tariff_id: 2, interval_id: 10, value: 133.90 },

  { tariff_id: 3, interval_id: 1, value: 51.50 },
  { tariff_id: 3, interval_id: 2, value: 77.20 },
  { tariff_id: 3, interval_id: 3, value: 103.00 },
  { tariff_id: 3, interval_id: 4, value: 128.70 },
  { tariff_id: 3, interval_id: 5, value: 154.50 },
  { tariff_id: 3, interval_id: 6, value: 231.70 },
  { tariff_id: 3, interval_id: 7, value: 463.50 },
  { tariff_id: 3, interval_id: 8, value: 695.20 },
  { tariff_id: 3, interval_id: 9, value: 772.50 },
  { tariff_id: 3, interval_id: 10, value: 927.00 },

  { tariff_id: 4, interval_id: 1, value: 206.00 },
  { tariff_id: 4, interval_id: 2, value: 309.00 },
  { tariff_id: 4, interval_id: 3, value: 412.00 },
  { tariff_id: 4, interval_id: 4, value: 515.00 },
  { tariff_id: 4, interval_id: 5, value: 618.00 },
  { tariff_id: 4, interval_id: 6, value: 927.00 },
  { tariff_id: 4, interval_id: 7, value: 1854.00 },
  { tariff_id: 4, interval_id: 8, value: 2781.00 },
  { tariff_id: 4, interval_id: 9, value: 3708.00 },
  { tariff_id: 4, interval_id: 10, value: 4635.00 },

  { tariff_id: 5, interval_id: 1, value: 824.00 },
  { tariff_id: 5, interval_id: 2, value: 927.00 },
  { tariff_id: 5, interval_id: 3, value: 1030.00 },
  { tariff_id: 5, interval_id: 4, value: 1287.50 },
  { tariff_id: 5, interval_id: 5, value: 1545.00 },
  { tariff_id: 5, interval_id: 6, value: 2317.50 },
  { tariff_id: 5, interval_id: 7, value: 4480.50 },
  { tariff_id: 5, interval_id: 8, value: 6695.00 },
  { tariff_id: 5, interval_id: 9, value: 10300.00 },
  { tariff_id: 5, interval_id: 10, value: 18025.00 },

  { tariff_id: 6, interval_id: 1, value: 128.70 },
  { tariff_id: 6, interval_id: 2, value: 193.10 },
  { tariff_id: 6, interval_id: 3, value: 257.50 },
  { tariff_id: 6, interval_id: 4, value: 321.80 },
  { tariff_id: 6, interval_id: 5, value: 386.20 },
  { tariff_id: 6, interval_id: 6, value: 579.30 },
  { tariff_id: 6, interval_id: 7, value: 1158.70 },
  { tariff_id: 6, interval_id: 8, value: 1738.10 },
  { tariff_id: 6, interval_id: 9, value: 2060.00 },
  { tariff_id: 6, interval_id: 10, value: 2575.00 },

  { tariff_id: 7, interval_id: 1, value: 257.50 },
  { tariff_id: 7, interval_id: 2, value: 386.20 },
  { tariff_id: 7, interval_id: 3, value: 515.00 },
  { tariff_id: 7, interval_id: 4, value: 643.70 },
  { tariff_id: 7, interval_id: 5, value: 772.50 },
  { tariff_id: 7, interval_id: 6, value: 1158.70 },
  { tariff_id: 7, interval_id: 7, value: 2317.50 },
  { tariff_id: 7, interval_id: 8, value: 2575.00 },
  { tariff_id: 7, interval_id: 9, value: 2832.50 },
  { tariff_id: 7, interval_id: 10, value: 3090.00 },

  { tariff_id: 8, interval_id: 1, value: 144.20 },
  { tariff_id: 8, interval_id: 2, value: 200.80 },
  { tariff_id: 8, interval_id: 3, value: 257.50 },
  { tariff_id: 8, interval_id: 4, value: 360.50 },
  { tariff_id: 8, interval_id: 5, value: 463.50 },
  { tariff_id: 8, interval_id: 6, value: 927.00 },
  { tariff_id: 8, interval_id: 7, value: 1390.50 },
  { tariff_id: 8, interval_id: 8, value: 2111.50 },
  { tariff_id: 8, interval_id: 9, value: 2575.00 },
  { tariff_id: 8, interval_id: 10, value: 3090.00 },

  { tariff_id: 9, interval_id: 1, value: 51.50 },
  { tariff_id: 9, interval_id: 2, value: 51.50 },
  { tariff_id: 9, interval_id: 3, value: 51.50 },
  { tariff_id: 9, interval_id: 4, value: 51.50 },
  { tariff_id: 9, interval_id: 5, value: 103.00 },
  { tariff_id: 9, interval_id: 6, value: 103.00 },
  { tariff_id: 9, interval_id: 7, value: 103.00 },
  { tariff_id: 9, interval_id: 8, value: 103.00 },
  { tariff_id: 9, interval_id: 9, value: 154.50 },
  { tariff_id: 9, interval_id: 10, value: 154.50 },

  // POR SOLICITUD DE

  { tariff_id: 10, interval_id: 11, value: 515.00 },
  { tariff_id: 10, interval_id: 12, value: 1030.00 },
  { tariff_id: 10, interval_id: 13, value: 1545.00 },
  { tariff_id: 10, interval_id: 14, value: 2360.00 },
  { tariff_id: 10, interval_id: 15, value: 2575.00 },
  { tariff_id: 10, interval_id: 16, value: 3090.00 },
  { tariff_id: 10, interval_id: 17, value: 4120.00 },
  { tariff_id: 10, interval_id: 18, value: 6437.50 },
  { tariff_id: 10, interval_id: 19, value: 8497.50 },

  { tariff_id: 11, interval_id: 11, value: 515.00 },
  { tariff_id: 11, interval_id: 12, value: 1030.00 },
  { tariff_id: 11, interval_id: 13, value: 1545.00 },
  { tariff_id: 11, interval_id: 14, value: 2360.00 },
  { tariff_id: 11, interval_id: 15, value: 2575.00 },
  { tariff_id: 11, interval_id: 16, value: 3090.00 },
  { tariff_id: 11, interval_id: 17, value: 4120.00 },
  { tariff_id: 11, interval_id: 18, value: 6437.50 },
  { tariff_id: 11, interval_id: 19, value: 10300.00 },

  { tariff_id: 12, interval_id: 11, value: 515.00 },
  { tariff_id: 12, interval_id: 12, value: 1030.00 },
  { tariff_id: 12, interval_id: 13, value: 1545.00 },
  { tariff_id: 12, interval_id: 14, value: 2360.00 },
  { tariff_id: 12, interval_id: 15, value: 2575.00 },
  { tariff_id: 12, interval_id: 16, value: 3090.00 },
  { tariff_id: 12, interval_id: 17, value: 4120.00 },
  { tariff_id: 12, interval_id: 18, value: 6437.50 },
  { tariff_id: 12, interval_id: 19, value: 8497.50 },
]

export async function up(queryInterface: QueryInterface) {
  try {
    await queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
    await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'total_tariff', {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    })
    await queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'tariff_history', {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    })

    await queryInterface.createTable(TARIFF_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_tariff",
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "code",
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        field: "description",
      },
    });

    await queryInterface.createTable(TARIFF_INTERVAL_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_tariff_interval",
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
        field: "description",
      },
      interval: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "interval",
      },
      intervalDescription: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "interval_description",
      },
    })

    await queryInterface.createTable(TARIFF_INTERVAL_MATCH_TABLE, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_tariff_interval_match",
      },
      tariffId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "tariff_id",
        references: {
          model: TARIFF_TABLE,
          key: "id_tariff",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
      intervalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "interval_id",
        references: {
          model: TARIFF_INTERVAL_TABLE,
          key: "id_tariff_interval",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: "value",
      },
    })

    await queryInterface.bulkInsert(TARIFF_TABLE, tariff);
    await queryInterface.bulkInsert(TARIFF_INTERVAL_TABLE, tariffInterval);
    await queryInterface.bulkInsert(
      TARIFF_INTERVAL_MATCH_TABLE,
      tariffIntervalMatch
    );
  } catch (e) {
    console.log(e);
  }
}

export async function down(queryInterface: QueryInterface) {
  const deleteCriteria = {
    code: {
      [Op.startsWith]: ["P43"],
    },
  };
  await queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
  await queryInterface.dropTable(TARIFF_INTERVAL_MATCH_TABLE);
  await queryInterface.dropTable(TARIFF_INTERVAL_TABLE);
  await queryInterface.dropTable(TARIFF_TABLE);
  await queryInterface.dropTable(JUDICIAL_BINNACLE_TABLE);
}



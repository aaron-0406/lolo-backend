"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const tariff_model_1 = __importDefault(require("../models/tariff.model"));
const tariff_interval_model_1 = __importDefault(require("../models/tariff-interval.model"));
const tariff_interval_match_model_1 = __importDefault(require("../models/tariff-interval-match.model"));
const { TARIFF_TABLE } = tariff_model_1.default;
const { TARIFF_INTERVAL_TABLE } = tariff_interval_model_1.default;
const { TARIFF_INTERVAL_MATCH_TABLE } = tariff_interval_match_model_1.default;
const tariff = [
    { code: "PTE-00003-01", type: "POR TRAMITE DE EXHORTO", description: "Copia literal" },
    { code: "PTE-00003-02", type: "POR TRAMITE DE EXHORTO", description: "Certificado de gravamen" },
    { code: "PTE-00003-03", type: "POR TRAMITE DE EXHORTO", description: "Busquedas registral a nivel nacional" },
    { code: "PTE-00003-04", type: "POR TRAMITE DE EXHORTO", description: "Gastos prejudiciales" },
    { code: "08990", type: "POR TRAMITE DE EXHORTO", description: "EXPEDICION DE PARTES JUDICIALES" },
    { code: "TP-00004-01", type: "TARIFA PERSONALIZADA", description: "Deposito judicial" },
    { code: "TP-00004-02", type: "TARIFA PERSONALIZADA", description: "Gasto registral" },
    { code: "TP-00004-03", type: "TARIFA PERSONALIZADA", description: "Publicación en periodico" },
    { code: "TP-00004-04", type: "TARIFA PERSONALIZADA", description: "Pago a perito" },
    { code: "TP-00004-05", type: "TARIFA PERSONALIZADA", description: "Pago a curador judicicial" },
    { code: "TP-00004-06", type: "TARIFA PERSONALIZADA", description: "Pago a martillero" },
    { code: "TP-00004-07", type: "TARIFA PERSONALIZADA", description: "REINTEGRO" },
];
const tariffInterval = [
    { description: 'Asignado a intervalo', interval: "[null, null]", interval_description: 'Asignado a intervalo de tarifas' },
];
const tariffIntervalMatch = [
    { tariff_id: 18, interval_id: 20, value: 150.00 },
    { tariff_id: 19, interval_id: 20, value: 100.00 },
    { tariff_id: 20, interval_id: 20, value: 115.00 },
    { tariff_id: 21, interval_id: 20, value: 450.00 },
    { tariff_id: 22, interval_id: 20, value: 51.50 },
    { tariff_id: 23, interval_id: 20, value: 0.00 },
    { tariff_id: 24, interval_id: 20, value: 0.00 },
    { tariff_id: 25, interval_id: 20, value: 0.00 },
    { tariff_id: 26, interval_id: 20, value: 0.00 },
    { tariff_id: 27, interval_id: 20, value: 0.00 },
    { tariff_id: 28, interval_id: 20, value: 0.00 },
];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addColumn(TARIFF_TABLE, "customer_has_bank_id_customer_has_bank", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: false
        });
        try {
            yield queryInterface.bulkInsert(TARIFF_TABLE, tariff);
            yield queryInterface.bulkInsert(TARIFF_INTERVAL_TABLE, tariffInterval);
            yield queryInterface.bulkInsert(TARIFF_INTERVAL_MATCH_TABLE, tariffIntervalMatch);
            yield queryInterface.bulkUpdate(TARIFF_TABLE, { customer_has_bank_id_customer_has_bank: 1 }, {});
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield queryInterface.bulkDelete(TARIFF_TABLE, tariff);
            yield queryInterface.bulkDelete(TARIFF_INTERVAL_TABLE, tariffInterval);
            yield queryInterface.bulkDelete(TARIFF_INTERVAL_MATCH_TABLE, tariffIntervalMatch);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.down = down;

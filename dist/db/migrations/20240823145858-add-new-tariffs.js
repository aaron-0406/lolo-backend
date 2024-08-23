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
exports.up = void 0;
const tariff_model_1 = __importDefault(require("../models/tariff.model"));
const tariff_interval_model_1 = __importDefault(require("../models/tariff-interval.model"));
const tariff_interval_match_model_1 = __importDefault(require("../models/tariff-interval-match.model"));
const { TARIFF_TABLE } = tariff_model_1.default;
const { TARIFF_INTERVAL_TABLE } = tariff_interval_model_1.default;
const { TARIFF_INTERVAL_MATCH_TABLE } = tariff_interval_match_model_1.default;
const tariff = [
    { code: "08214-01", type: "POR TRAMITE DE EXHORTO", description: "Dentro del distrito judicial" },
    { code: "08214-02", type: "POR TRAMITE DE EXHORTO", description: "Otro distrito judicial" },
    { code: "08214-03", type: "POR TRAMITE DE EXHORTO", description: "Al extranjero" },
    { code: "09970", type: "POR TRAMITE DE EXHORTO", description: "Costo por Derecho de Notificación Judicial para el año 2024" },
    { code: "07375", type: "POR TRAMITE DE EXHORTO", description: "Publicación de Edicto Judicial Electrónico" },
];
const tariffInterval = [
    { description: 'Asignado a intervalo', interval: "[null, null]", interval_description: 'Asignado a intervalo de tarifas' },
];
const tariffIntervalMatch = [
    { tariff_id: 13, interval_id: 20, value: 51.50 },
    { tariff_id: 14, interval_id: 20, value: 103.00 },
    { tariff_id: 15, interval_id: 20, value: 257.50 },
    { tariff_id: 16, interval_id: 20, value: 5.30 },
    { tariff_id: 17, interval_id: 20, value: 32.00 },
];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield queryInterface.bulkInsert(TARIFF_TABLE, tariff);
            yield queryInterface.bulkInsert(TARIFF_INTERVAL_TABLE, tariffInterval);
            yield queryInterface.bulkInsert(TARIFF_INTERVAL_MATCH_TABLE, tariffIntervalMatch);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.up = up;

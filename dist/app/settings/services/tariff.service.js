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
const sequelize_1 = __importDefault(require("../../../libs/sequelize"));
const boom_1 = __importDefault(require("@hapi/boom"));
const { models } = sequelize_1.default;
const TariffType = {
    CONTENTIOUS_PROCESS: "PROCESOS CONTENCIOSOS",
    REQUEST_OF: "POR SOLICITUD DE",
};
class TariffService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let contentiousProcessesHeaders = [];
            let requestOfHeaders = [];
            const rta = yield models.TARIFF.findAll({
                include: [
                    {
                        model: models.TARIFF_INTERVAL_MATCH,
                        as: "tariffIntervalMatch",
                        include: [
                            {
                                model: models.TARIFF_INTERVAL,
                                as: "tariffInterval",
                                attributes: ["id", "description", "interval", "intervalDescription"],
                            }
                        ]
                    }
                ],
            });
            if (!rta) {
                throw boom_1.default.notFound("No existen tarifas");
            }
            const contentiousProcesses = rta.filter(tariff => tariff.dataValues.type === TariffType.CONTENTIOUS_PROCESS);
            const requestOf = rta.filter(tariff => tariff.dataValues.type === TariffType.REQUEST_OF);
            if (!contentiousProcesses.length)
                return;
            if (!contentiousProcesses[0].dataValues.tariffIntervalMatch.length)
                return;
            contentiousProcesses[0].dataValues.tariffIntervalMatch.forEach((intervalMatch) => {
                contentiousProcessesHeaders.push({
                    description: intervalMatch.dataValues.tariffInterval.dataValues.description,
                    headerTitle: intervalMatch.dataValues.tariffInterval.dataValues
                        .intervalDescription,
                });
            });
            if (!requestOf.length)
                return;
            if (!requestOf[0].dataValues.tariffIntervalMatch.length)
                return;
            requestOf[0].dataValues.tariffIntervalMatch.forEach((intervalMatch) => {
                requestOfHeaders.push({
                    description: intervalMatch.dataValues.tariffInterval.dataValues.description,
                    headerTitle: intervalMatch.dataValues.tariffInterval.dataValues
                        .intervalDescription,
                });
            });
            return { contentiousProcessesHeaders, requestOfHeaders, contentiousProcesses, requestOf };
        });
    }
    findAllByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.TARIFF.findAll({
                where: {
                    type,
                },
                include: [
                    {
                        model: models.TARIFF_INTERVAL_MATCH,
                        as: "intervals",
                        attributes: ["id", "value"],
                        include: [
                            {
                                model: models.TARIFF_INTERVAL,
                                as: "interval",
                                attributes: ["id", "description", "interval", "intervalDescription"],
                            }
                        ]
                    }
                ],
            });
            if (!rta) {
                throw boom_1.default.notFound("No existen tarifas");
            }
            return rta;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTariff = yield models.TARIFF.create(data);
            return newTariff;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tariff = yield models.TARIFF.findByPk(id);
            if (!tariff) {
                throw boom_1.default.notFound("Tarifa no encontrada");
            }
            yield tariff.update(data);
            return tariff;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tariff = yield models.TARIFF.findByPk(id);
            if (!tariff) {
                throw boom_1.default.notFound("Tarifa no encontrada");
            }
            yield tariff.destroy();
            return { id };
        });
    }
}
exports.default = TariffService;

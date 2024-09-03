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
    BY_EXHORT_PROCESS: "POR TRAMITE DE EXHORTO",
    CUSTOM_TARIFF: "TARIFA PERSONALIZADA"
};
class TariffService {
    constructor() { }
    findAll(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            let contentiousProcessesHeaders = [];
            let requestOfHeaders = [];
            let byExhortProcessHeaders = [];
            let customTariffHeaders = [];
            const rta = yield models.TARIFF.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
                include: [
                    {
                        model: models.TARIFF_INTERVAL_MATCH,
                        as: "tariffIntervalMatch",
                        include: [
                            {
                                model: models.TARIFF_INTERVAL,
                                as: "tariffInterval",
                                attributes: [
                                    "id",
                                    "description",
                                    "interval",
                                    "intervalDescription",
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!rta) {
                throw boom_1.default.notFound("No existen tarifas");
            }
            const contentiousProcesses = rta.filter((tariff) => tariff.dataValues.type === TariffType.CONTENTIOUS_PROCESS);
            const requestOf = rta.filter((tariff) => tariff.dataValues.type === TariffType.REQUEST_OF);
            const byExhortProcess = rta.filter((tariff) => tariff.dataValues.type === TariffType.BY_EXHORT_PROCESS);
            const customTariff = rta.filter((tariff) => tariff.dataValues.type === TariffType.CUSTOM_TARIFF);
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
            if (!byExhortProcess.length)
                return;
            if (!byExhortProcess[0].dataValues.tariffIntervalMatch.length)
                return;
            if (!customTariff.length)
                return;
            if (!customTariff[0].dataValues.tariffIntervalMatch.length)
                return;
            return {
                contentiousProcessesHeaders,
                requestOfHeaders,
                contentiousProcesses,
                requestOf,
                byExhortProcessHeaders,
                byExhortProcess,
                customTariffHeaders,
                customTariff,
            };
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
                                attributes: [
                                    "id",
                                    "description",
                                    "interval",
                                    "intervalDescription",
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!rta) {
                throw boom_1.default.notFound("No existen tarifas");
            }
            return rta;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tariff = yield models.TARIFF.findByPk(id);
            if (!tariff) {
                boom_1.default.notFound("Tarifa no encontrada");
                return null;
            }
            ;
            return tariff;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTariff = yield models.TARIFF.create({
                code: data.code,
                type: data.type,
                description: data.description,
                customerHasBankId: data.customerHasBankId,
            });
            if (!newTariff) {
                boom_1.default.notFound("Hubo un error al crear el tarifa");
                return;
            }
            ;
            if (data.type === TariffType.CUSTOM_TARIFF || data.type === TariffType.BY_EXHORT_PROCESS) {
                try {
                    yield models.TARIFF_INTERVAL_MATCH.create({
                        tariffId: newTariff.dataValues.id,
                        intervalId: 20,
                        value: data.value,
                    });
                }
                catch (error) {
                    return console.log(error);
                }
            }
            const tariffInterval = yield models.TARIFF.findByPk(newTariff.dataValues.id, {
                include: [
                    {
                        model: models.TARIFF_INTERVAL_MATCH,
                        as: "tariffIntervalMatch",
                        include: [
                            {
                                model: models.TARIFF_INTERVAL,
                                as: "tariffInterval",
                                attributes: [
                                    "id",
                                    "description",
                                    "interval",
                                    "intervalDescription",
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!tariffInterval) {
                boom_1.default.notFound("Tarifa no encontrada");
                return;
            }
            ;
            return tariffInterval;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tariff = yield models.TARIFF.findByPk(id, {
                include: [
                    {
                        model: models.TARIFF_INTERVAL_MATCH,
                        as: "tariffIntervalMatch",
                        include: [
                            {
                                model: models.TARIFF_INTERVAL,
                                as: "tariffInterval",
                                attributes: [
                                    "id",
                                    "description",
                                    "interval",
                                    "intervalDescription",
                                ],
                            },
                        ],
                    },
                ],
            });
            if (!tariff) {
                boom_1.default.notFound("Tarifa no encontrada");
                return { oldTariff: null, newTariff: null };
            }
            const oldTariff = Object.assign({}, tariff.get());
            yield tariff.update({
                code: data.code,
                type: data.type,
                description: data.description,
            });
            const tariffIntervalMatch = yield models.TARIFF_INTERVAL_MATCH.findAll({
                where: {
                    tariffId: id,
                },
            });
            if (!tariffIntervalMatch.length) {
                boom_1.default.notFound("Tarifa no encontrada");
                return { oldTariff: null, newTariff: null };
            }
            if (data.type === TariffType.CUSTOM_TARIFF ||
                data.type === TariffType.BY_EXHORT_PROCESS) {
                try {
                    yield tariffIntervalMatch[0].update({
                        value: data.value,
                    });
                }
                catch (error) {
                    boom_1.default.badRequest("Hubo un error al crear el interval match de tarifas");
                    return { oldTariff: null, newTariff: null };
                }
            }
            const newTariff = yield models.TARIFF.findByPk(tariff.dataValues.id, {
                include: [
                    {
                        model: models.TARIFF_INTERVAL_MATCH,
                        as: "tariffIntervalMatch",
                        include: [
                            {
                                model: models.TARIFF_INTERVAL,
                                as: "tariffInterval",
                                attributes: [
                                    "id",
                                    "description",
                                    "interval",
                                    "intervalDescription",
                                ],
                            },
                        ],
                    },
                ],
            });
            return { oldTariff, newTariff };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tariff = yield this.findById(id);
            if (!tariff)
                return null;
            const oldTariff = Object.assign({}, tariff.get());
            yield models.TARIFF_INTERVAL_MATCH.destroy({
                where: {
                    tariffId: id,
                },
            });
            yield models.TARIFF.destroy({
                where: {
                    id: id,
                },
            });
            return oldTariff;
        });
    }
}
exports.default = TariffService;

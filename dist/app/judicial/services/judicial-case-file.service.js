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
const sequelize_2 = require("sequelize");
const qrcode_1 = require("qrcode");
const { models } = sequelize_1.default;
class JudicialCaseFileService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_CASE_FILE.findAll();
            return rta;
        });
    }
    findAllByClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findAll({
                where: {
                    clientId,
                },
            });
            if (!judicialCaseFile) {
                throw boom_1.default.notFound("Expedientes no encontrados");
            }
            return judicialCaseFile;
        });
    }
    findAllByCHB(chb, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, page, filter, courts, sedes, proceduralWays, subjects, users, responsibles, sortBy, order } = query;
            const limite = parseInt(limit, 10);
            const pagina = parseInt(page, 10);
            const clientName = filter;
            const listCourts = JSON.parse(courts);
            const listProceduralWays = JSON.parse(proceduralWays);
            const listSubjects = JSON.parse(subjects);
            const listUsers = JSON.parse(users);
            const listResponsibles = JSON.parse(responsibles);
            const listSedes = JSON.parse(sedes);
            const sortByField = sortBy;
            const filters = {};
            if (listCourts.length) {
                filters.judicial_court_id_judicial_court = { [sequelize_2.Op.in]: listCourts };
            }
            if (listProceduralWays.length) {
                filters.judicial_procedural_way_id_judicial_procedural_way = {
                    [sequelize_2.Op.in]: listProceduralWays,
                };
            }
            if (listSubjects.length) {
                filters.judicial_subject_id_judicial_subject = { [sequelize_2.Op.in]: listSubjects };
            }
            if (listUsers.length) {
                filters.customer_user_id_customer_user = { [sequelize_2.Op.in]: listUsers };
            }
            if (listResponsibles.length) {
                filters.responsible_user_id = { [sequelize_2.Op.in]: listResponsibles };
            }
            if (listSedes.length) {
                filters.judicial_sede_id_judicial_sede = { [sequelize_2.Op.in]: listSedes };
            }
            let sortField;
            let orderConfig;
            let model;
            if (sortBy && order) {
                switch (sortByField) {
                    case 'CLIENTE':
                        sortField = 'name';
                        model = models.CLIENT;
                        break;
                    case 'judicialCourt':
                        sortField = 'name';
                        model = models.JUDICIAL_COURT;
                        break;
                    case 'proceduralWay':
                        sortField = 'name';
                        model = models.JUDICIAL_PROCEDURAL_WAY;
                        break;
                    default:
                        sortField = 'createdAt';
                        model = undefined;
                }
                if (model) {
                    orderConfig = [[{ model, as: model.name.toLowerCase() }, sortField, order]];
                }
                else {
                    orderConfig = [[sortField, order]];
                }
            }
            else {
                orderConfig = undefined;
            }
            let filtersWhere = {
                customer_has_bank_id: chb,
                id_judicial_case_file_related: null,
            };
            // Agregar filtro por nombre de cliente si se proporciona
            if (clientName) {
                filtersWhere = Object.assign(Object.assign({}, filtersWhere), { "$client.name$": { [sequelize_2.Op.like]: `%${clientName}%` } });
            }
            // Combinar filtros adicionales si se proporcionan
            if (Object.keys(filters).length > 0) {
                filtersWhere = {
                    [sequelize_2.Op.and]: [{ [sequelize_2.Op.or]: [filters] }, filtersWhere],
                };
            }
            try {
                const quantity = yield models.JUDICIAL_CASE_FILE.count({
                    include: [
                        { model: models.CLIENT, as: "client" },
                    ],
                    where: filtersWhere,
                });
                const caseFiles = yield models.JUDICIAL_CASE_FILE.findAll({
                    include: [
                        {
                            model: models.CUSTOMER_USER,
                            as: "customerUser",
                            attributes: ["id", "name"],
                        },
                        {
                            model: models.CUSTOMER_USER,
                            as: "responsibleUser",
                            attributes: ["id", "name"],
                        },
                        { model: models.JUDICIAL_COURT, as: "judicialCourt" },
                        {
                            model: models.JUDICIAL_PROCEDURAL_WAY,
                            as: "judicialProceduralWay",
                        },
                        { model: models.JUDICIAL_SUBJECT, as: "judicialSubject" },
                        { model: models.JUDICIAL_SEDE, as: "judicialSede" },
                        { model: models.CITY, as: "city" },
                        { model: models.CLIENT, as: "client", attributes: ["id", "name"] },
                    ],
                    limit: limite,
                    offset: (pagina - 1) * limite,
                    where: filtersWhere,
                    order: orderConfig, // Orden configurado dinámicamente según sortBy y order
                });
                return { caseFiles, quantity };
            }
            catch (error) {
                console.error("Error en findAllByCHB:", error);
                throw boom_1.default.badImplementation("Error al consultar los expedientes");
            }
        });
    }
    // Métodos adicionales del servicio aquí...
    existNumberCaseFile(customerId, numberCaseFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findOne({
                where: {
                    number_case_file: numberCaseFile,
                },
            });
            if (!judicialCaseFile) {
                return false;
            }
            const customerHasBank = yield models.CUSTOMER_HAS_BANK.findOne({
                where: {
                    id_customer_has_bank: judicialCaseFile === null || judicialCaseFile === void 0 ? void 0 : judicialCaseFile.dataValues.customerHasBankId,
                },
            });
            if (!customerHasBank) {
                return false;
            }
            if (customerId == customerHasBank.dataValues.idCustomer) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: models.CUSTOMER_USER,
                        as: "customerUser",
                        attributes: ["id", "name"],
                    },
                    {
                        model: models.CUSTOMER_USER,
                        as: "responsibleUser",
                        attributes: ["id", "name"],
                    },
                    {
                        model: models.JUDICIAL_COURT,
                        as: "judicialCourt",
                    },
                    {
                        model: models.JUDICIAL_PROCEDURAL_WAY,
                        as: "judicialProceduralWay",
                    },
                    {
                        model: models.JUDICIAL_SUBJECT,
                        as: "judicialSubject",
                    },
                    {
                        model: models.JUDICIAL_SEDE,
                        as: "judicialSede",
                    },
                    {
                        model: models.CITY,
                        as: "city",
                    },
                    {
                        model: models.CLIENT,
                        as: "client",
                        attributes: ["id", "name"],
                    },
                ],
            });
            if (!judicialCaseFile) {
                throw boom_1.default.notFound("Expediente no encontrado");
            }
            return judicialCaseFile;
        });
    }
    findByNumberCaseFile(numberCaseFile, chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findOne({
                include: [
                    {
                        model: models.CUSTOMER_USER,
                        as: "responsibleUser",
                        attributes: ["id", "name"],
                    },
                    {
                        model: models.CLIENT,
                        as: "client",
                        include: [
                            {
                                model: models.CUSTOMER_USER,
                                as: "customerUser",
                                attributes: ["id", "name"],
                            },
                        ],
                    },
                    {
                        model: models.JUDICIAL_CASE_FILE,
                        as: "relatedJudicialCaseFile",
                        attributes: ["numberCaseFile"],
                    }
                ],
                where: {
                    numberCaseFile,
                    customer_has_bank_id: chb,
                },
            });
            if (!judicialCaseFile) {
                throw boom_1.default.notFound("Expediente no encontrado");
            }
            return judicialCaseFile;
        });
    }
    findRelatedNumberCaseFile(numberCaseFile, chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const codes = numberCaseFile.split("-");
            codes[2] = "%";
            const filterNumberCaseFile = codes.join("-");
            const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findAll({
                include: {
                    model: models.CLIENT,
                    as: "client",
                    include: [
                        {
                            model: models.CUSTOMER_USER,
                            as: "customerUser",
                            attributes: ["id", "name"],
                        },
                    ],
                },
                where: {
                    numberCaseFile: {
                        [sequelize_2.Op.like]: filterNumberCaseFile,
                    },
                    customer_has_bank_id: chb,
                },
            });
            if (!judicialCaseFile) {
                throw boom_1.default.notFound("Expediente no encontrado");
            }
            return judicialCaseFile;
        });
    }
    create(data, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCaseFile = yield this.existNumberCaseFile(customerId, data.numberCaseFile);
            if (!existCaseFile) {
                const newJudicialCaseFile = yield models.JUDICIAL_CASE_FILE.create(data);
                const judicialCaseFile = yield this.findByID(newJudicialCaseFile.dataValues.id);
                return judicialCaseFile;
            }
            else {
                throw boom_1.default.notFound("Ya existe un expediente con este código");
            }
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield this.findByID(id);
            const rta = yield judicialCaseFile.update(changes);
            return rta;
        });
    }
    updateProcessStatus(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield this.findByID(id);
            const rta = yield judicialCaseFile.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.findByID(id);
            yield client.destroy();
            return { id };
        });
    }
    createQrCode(numberCaseFile, chb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qrCodeImg64 = yield (0, qrcode_1.toDataURL)(numberCaseFile, { version: 2 });
                const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findOne({
                    where: {
                        numberCaseFile,
                        customerHasBankId: chb,
                    },
                });
                if (!judicialCaseFile)
                    return boom_1.default.notFound("Expediente no encontrado");
                yield judicialCaseFile.update({ qrCode: qrCodeImg64 });
                return qrCodeImg64;
            }
            catch (err) {
                throw boom_1.default.badRequest("Error al generar el código QR");
            }
        });
    }
}
exports.default = JudicialCaseFileService;

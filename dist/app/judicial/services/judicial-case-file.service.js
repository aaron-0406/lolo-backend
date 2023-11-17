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
            const { limit, page, filter } = query;
            //TODO: Improving this code to get the filtered judicial case list
            //TODO: Remove negotiation, funcionario and customer user
            const { negotiations, funcionarios, users, name } = filter;
            const limite = parseInt(limit, 10);
            const pagina = parseInt(page, 10);
            const names = name;
            const listNegotiations = JSON.parse(negotiations);
            const listFuncionarios = JSON.parse(funcionarios);
            const listUsers = JSON.parse(users);
            const filters = {};
            if (filter !== "" && filter !== undefined) {
                filters.name = { [sequelize_2.Op.substring]: names };
            }
            if (listNegotiations.length) {
                filters.negotiation_id_negotiation = { [sequelize_2.Op.in]: listNegotiations };
            }
            if (listFuncionarios.length) {
                filters.funcionario_id_funcionario = { [sequelize_2.Op.in]: listFuncionarios };
            }
            if (listUsers.length) {
                filters.customer_user_id_customer_user = { [sequelize_2.Op.in]: listUsers };
            }
            let filtersWhere = {
                customer_has_bank_id: chb,
            };
            if (Object.keys(filters).length > 0) {
                filtersWhere = {
                    [sequelize_2.Op.or]: [filters],
                    customer_has_bank_id: chb,
                };
            }
            const quantity = yield models.CLIENT.count({
                where: filtersWhere,
            });
            const clients = yield models.CLIENT.findAll({
                include: [
                    { model: models.NEGOTIATION, as: "negotiation" },
                    {
                        model: models.FUNCIONARIO,
                        as: "funcionario",
                        attributes: { exclude: ["bankId"] },
                    },
                    {
                        model: models.CUSTOMER_USER,
                        as: "customerUser",
                    },
                ],
                order: [["name", "ASC"]],
                limit: limite,
                offset: (pagina - 1) * limite,
                where: filtersWhere,
            });
            return { clients, quantity };
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findOne({
                where: {
                    id,
                },
            });
            if (!judicialCaseFile) {
                throw boom_1.default.notFound("Expediente no encontrado");
            }
            return judicialCaseFile;
        });
    }
    findByNumberCaseFile(numberCaseFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findOne({
                where: {
                    numberCaseFile,
                },
            });
            if (!judicialCaseFile) {
                throw boom_1.default.notFound("Expediente no encontrado");
            }
            return judicialCaseFile;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialCaseFile = yield models.JUDICIAL_CASE_FILE.create(data);
            return newJudicialCaseFile;
        });
    }
    update(id, changes) {
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
}
exports.default = JudicialCaseFileService;

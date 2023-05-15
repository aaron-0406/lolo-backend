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
const sequelize_2 = require("sequelize");
const boom_1 = __importDefault(require("@hapi/boom"));
const config_1 = __importDefault(require("../../../config/config"));
const aws_bucket_1 = require("../../../libs/aws_bucket");
const { models } = sequelize_1.default;
class ClientService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CLIENT.findAll();
            return rta;
        });
    }
    findByCustomerIdAndCode(customerId, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CLIENT.findOne({
                where: {
                    code,
                },
                include: [
                    {
                        model: models.CUSTOMER_HAS_BANK,
                        as: "customerHasBank",
                        where: { idCustomer: customerId },
                    },
                ],
            });
            return rta;
        });
    }
    findAllByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CLIENT.findAll({
                include: [
                    {
                        model: models.CUSTOMER_HAS_BANK,
                        as: "customerHasBank",
                        where: { idCustomer: customerId },
                    },
                ],
            });
            return JSON.parse(JSON.stringify(rta));
        });
    }
    findAllCHB(chb, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, page, filter, negotiations, funcionarios, users, cities } = query;
            const limite = parseInt(limit, 10);
            const pagina = parseInt(page, 10);
            const filtro = filter;
            const listNegotiations = JSON.parse(negotiations);
            const listFuncionarios = JSON.parse(funcionarios);
            const listUsers = JSON.parse(users);
            const listCities = JSON.parse(cities);
            const filters = {};
            if (filter !== "" && filter !== undefined) {
                filters.name = { [sequelize_2.Op.substring]: filtro };
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
            if (listCities.length) {
                filters.city_id_city = { [sequelize_2.Op.in]: listCities };
            }
            let filtersWhere = {
                customer_has_bank_id_customer_has_bank: chb,
            };
            if (Object.keys(filters).length > 0) {
                filtersWhere = {
                    [sequelize_2.Op.or]: [filters],
                    customer_has_bank_id_customer_has_bank: chb,
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
                    {
                        model: models.CITY,
                        as: "city",
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
    findAllCHBDetails(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CLIENT.findAll({
                include: [
                    {
                        model: models.DIRECTION,
                        as: "direction",
                    },
                    {
                        model: models.GUARANTOR,
                        as: "guarantor",
                    },
                ],
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            return rta;
        });
    }
    findAllBDetailsAndClientsId(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CLIENT.findAll({
                include: [
                    {
                        model: models.CUSTOMER_USER,
                        as: "customerUser",
                        foreignKey: "customerUserId",
                        identifier: "id",
                        attributes: ["name", "lastName"],
                    },
                    {
                        model: models.FUNCIONARIO,
                        as: "funcionario",
                        foreignKey: "funcionarioId",
                        identifier: "id",
                        attributes: ["name"],
                    },
                    {
                        model: models.CITY,
                        as: "city",
                        foreignKey: "cityId",
                        identifier: "id",
                        attributes: ["name"],
                    },
                    {
                        model: models.NEGOTIATION,
                        as: "negotiation",
                        foreignKey: "negotiationId",
                        identifier: "id",
                        attributes: ["name"],
                    },
                    {
                        model: models.DIRECTION,
                        as: "direction",
                    },
                    {
                        model: models.GUARANTOR,
                        as: "guarantor",
                    },
                    {
                        model: models.COMMENT,
                        as: "comment",
                    },
                ],
                where: {
                    id: {
                        [sequelize_2.Op.in]: ids,
                    },
                },
            });
            return rta;
        });
    }
    findCode(code, chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield models.CLIENT.findOne({
                where: {
                    code: code,
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            if (!client) {
                throw boom_1.default.notFound("Cliente no encontrado");
            }
            return client;
        });
    }
    create(data, idCustomer) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield models.CLIENT.findOne({
                where: {
                    code: data.code,
                    customer_has_bank_id_customer_has_bank: data.customerHasBankId,
                },
            });
            if (client)
                throw boom_1.default.notFound("Ya existe un cliente con este código");
            const newClient = yield models.CLIENT.create(data);
            // CREATE A FOLDER FOR CLIENT
            yield (0, aws_bucket_1.createFolder)(`${config_1.default.AWS_CHB_PATH}${idCustomer}/${data.customerHasBankId}/${data.code}/`);
            return newClient;
        });
    }
    update(code, chb, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.findCode(code, chb);
            const rta = yield client.update(changes);
            return rta;
        });
    }
    delete(code, chb, idCustomer) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.findCode(code, chb);
            yield client.destroy();
            return { code };
        });
    }
}
exports.default = ClientService;

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
const exceljs_1 = require("exceljs");
const path_1 = __importDefault(require("path"));
const comment_service_1 = __importDefault(require("./comment.service"));
const product_service_1 = __importDefault(require("../../extrajudicial/services/product.service"));
const moment_1 = __importDefault(require("moment"));
const auth_handler_1 = require("../../../middlewares/auth.handler");
const { models } = sequelize_1.default;
class ClientService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CLIENT.findAll();
            return rta;
        });
    }
    //INFO: METHODS OF DASHBOARD
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
    //INFO: MODAL - SEARCH BY NAME OR CODE
    findByNameOrCode(chb, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter } = query;
            const filtro = filter;
            const filters = [
                { name: { [sequelize_2.Op.substring]: filtro } },
                { code: { [sequelize_2.Op.substring]: filtro } },
            ];
            let filtersWhere = {
                customer_has_bank_id_customer_has_bank: chb,
            };
            if (filters.length > 0) {
                filtersWhere = {
                    [sequelize_2.Op.or]: [...filters],
                    [sequelize_2.Op.and]: [
                        {
                            [sequelize_2.Op.or]: [
                                { chb_transferred: chb },
                                { customer_has_bank_id_customer_has_bank: chb },
                            ],
                        },
                    ],
                };
            }
            let clients = yield models.CLIENT.findAll({
                include: [
                    {
                        model: models.CUSTOMER_USER,
                        as: "customerUser",
                        attributes: ["id", "name"],
                    },
                ],
                order: [["name", "DESC"]],
                where: filtersWhere,
            });
            return clients;
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
    // INFO: VIEW - CLIENTS
    findCode(code, chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield models.CLIENT.findOne({
                where: {
                    code: code,
                    [sequelize_2.Op.or]: [
                        { chb_transferred: chb },
                        { customer_has_bank_id_customer_has_bank: chb },
                    ],
                },
                include: [
                    {
                        model: models.FUNCIONARIO,
                        as: "funcionario",
                        attributes: ["id", "name", "customerHasBankId"],
                    },
                    {
                        model: models.NEGOTIATION,
                        as: "negotiation",
                        attributes: ["id", "name", "customerHasBankId"],
                    },
                    {
                        model: models.CITY,
                        as: "city",
                        attributes: ["id", "name"],
                    },
                    {
                        model: models.CUSTOMER_USER,
                        as: "customerUser",
                        attributes: ["id", "name"],
                    },
                ],
            });
            if (!client) {
                throw boom_1.default.notFound("Cliente no encontrado");
            }
            return client;
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
                [sequelize_2.Op.or]: [
                    { chb_transferred: chb },
                    { customer_has_bank_id_customer_has_bank: chb },
                ],
            };
            if (Object.keys(filters).length > 0) {
                filtersWhere = {
                    [sequelize_2.Op.or]: [filters],
                    [sequelize_2.Op.and]: [
                        {
                            [sequelize_2.Op.or]: [
                                { chb_transferred: chb },
                                { customer_has_bank_id_customer_has_bank: chb },
                            ],
                        },
                    ],
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
                        attributes: ["id", "name"],
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
    save(data, idCustomer, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield models.CLIENT.findOne({
                where: {
                    code: data.code,
                    [sequelize_2.Op.or]: [
                        { chb_transferred: data.customerHasBankId },
                        { customer_has_bank_id_customer_has_bank: data.customerHasBankId },
                    ],
                },
            });
            if (!data.id && client) {
                throw boom_1.default.notFound("Ya existe un cliente con este código!");
            }
            if (client) {
                if (yield (0, auth_handler_1.checkPermissionsWithoutParams)(["P02-04"], user)) {
                    return this.update(data.code, String(data.customerHasBankId), data);
                }
                else {
                    throw boom_1.default.notFound("No tienes permisos para actualizar este cliente.");
                }
            }
            if (yield (0, auth_handler_1.checkPermissionsWithoutParams)(["P02-03"], user)) {
                const newClient = yield models.CLIENT.create(data);
                yield newClient.reload({
                    include: [
                        {
                            model: models.FUNCIONARIO,
                            as: "funcionario",
                            attributes: ["id", "name", "customerHasBankId"],
                        },
                        {
                            model: models.NEGOTIATION,
                            as: "negotiation",
                            attributes: ["id", "name", "customerHasBankId"],
                        },
                        {
                            model: models.CITY,
                            as: "city",
                            attributes: ["id", "name"],
                        },
                        {
                            model: models.CUSTOMER_USER,
                            as: "customerUser",
                            attributes: ["id", "name"],
                        },
                    ],
                });
                // CREATE A FOLDER FOR CLIENT
                yield (0, aws_bucket_1.createFolder)(`${config_1.default.AWS_CHB_PATH}${idCustomer}/${data.customerHasBankId}/${data.code}/`);
                return newClient;
            }
            else {
                throw boom_1.default.notFound("No tienes permisos para crear un nuevo cliente.");
            }
        });
    }
    transferToAnotherBank(code, chb, chbTransferred) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield this.findCode(code, chb);
                yield client.update(Object.assign(Object.assign({}, client), { chbTransferred: chb == chbTransferred ? null : chbTransferred }));
                const caseFiles = yield models.JUDICIAL_CASE_FILE.findAll({
                    where: {
                        clientId: client.dataValues.id,
                    },
                });
                caseFiles.forEach((caseFile) => __awaiter(this, void 0, void 0, function* () {
                    yield caseFile.update(Object.assign(Object.assign({}, caseFile), { chbTransferred: caseFile.dataValues.customerHasBankId == chbTransferred ? null : chbTransferred }));
                }));
                return { id: client.dataValues.id, chbTransferred };
            }
            catch (e) {
                console.log(e);
            }
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
            return { code, id: client.dataValues.id };
        });
    }
    readAndUpdateExcelFile(date, cityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = new exceljs_1.Workbook();
            yield workbook.xlsx.readFile(path_1.default.join(__dirname, "../../../docs/staticDocs/collection_management_excel.xlsx"));
            if (workbook.worksheets.length < 1) {
                throw new Error("No se encontraron hojas de trabajo en el archivo Excel");
            }
            const worksheet = workbook.getWorksheet("GESTIONES");
            const detailsWorksheet = workbook.getWorksheet("DETALLE");
            const columnA = detailsWorksheet.getColumn("A");
            const actionDropdownList = columnA.values.slice(2, 36);
            //Logic to update the file
            const commentService = new comment_service_1.default();
            const productService = new product_service_1.default();
            const comments = yield commentService.findAllByDate(date);
            const commentsWithProducts = yield Promise.all(comments.map((comment) => __awaiter(this, void 0, void 0, function* () {
                const products = yield productService.getByClientId(comment.client.id);
                return Object.assign(Object.assign({}, comment), { client: Object.assign(Object.assign({}, comment.client), { products: products.map((product) => {
                            return {
                                code: product.code,
                            };
                        }) }) });
            })));
            const data = [];
            commentsWithProducts.forEach((comment) => {
                if (comment.client.cityId == cityId) {
                    if (!!comment.managementAction) {
                        comment.client.products.forEach((product) => {
                            data.push(Object.assign({ productCode: product.code }, comment));
                        });
                    }
                }
            });
            if (data.length < 2) {
                throw new Error("No se encontraron suficientes gestiones para exportar");
            }
            worksheet.duplicateRow(2, data.length - 1, true);
            for (let index = 0; index < data.length; index++) {
                worksheet.getCell(`A${index + 2}`).value = data[index].productCode;
                worksheet.getCell(`B${index + 2}`).value = data[index].client.code;
                worksheet.getCell(`C${index + 2}`).value = data[index].client.name;
                worksheet.getCell(`D${index + 2}`).value = new Date(data[index].date);
                worksheet.getCell(`D${index + 2}`).numFmt = "dd/MM/yy";
                const hour = moment_1.default.utc(data[index].hour).toDate();
                worksheet.getCell(`E${index + 2}`).value = (0, moment_1.default)(hour)
                    .utcOffset("-05:00")
                    .format("HH:mm:00");
                worksheet.getCell(`E${index + 2}`).alignment = { horizontal: "right" };
                //MANAGEMENT ACTIONS
                if (data[index].negotiation === "LLAMADA") {
                    worksheet.getCell(`F${index + 2}`).value = "Telefónica";
                }
                else if (data[index].negotiation === "VISITA") {
                    worksheet.getCell(`F${index + 2}`).value = "Campo";
                }
                else {
                    //ADD MORE
                    worksheet.getCell(`F${index + 2}`).value = "";
                }
                //MANAGEMENT ACTIONS - ACTIONS
                worksheet.getCell(`G${index + 2}`).value = actionDropdownList.find((action) => (action === null || action === void 0 ? void 0 : action.toString().trim()) ===
                    data[index].managementAction.codeAction.trim());
                worksheet.getCell(`G${index + 2}`).dataValidation = {
                    type: "list",
                    formulae: [`DETALLE!$A$2:$A$35`],
                };
                worksheet.getCell(`H${index + 2}`).value = {
                    formula: `=IF(G${index + 2}="","",VLOOKUP(G${index + 2},DETALLE!$A:$B,2,0))`,
                    result: undefined,
                    date1904: false,
                };
                worksheet.getCell(`I${index + 2}`).value =
                    data[index].comment.toLowerCase();
            }
            const pathname = path_1.default.join(__dirname, "../../../docs/1collection_management_excel.xlsx");
            yield workbook.xlsx.writeFile(pathname);
            return pathname;
        });
    }
}
exports.default = ClientService;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendXslxController = exports.deleteProductsXslxController = exports.createProductsXslxController = exports.deleteClientsXslxController = exports.createClientsXslxController = exports.readXslxController = void 0;
const nodemailer = __importStar(require("nodemailer"));
const boom_1 = __importDefault(require("@hapi/boom"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const dashboard_service_1 = __importDefault(require("../../app/dash/services/dashboard.service"));
const customer_user_service_1 = __importDefault(require("../../app/dash/services/customer-user.service"));
const client_service_1 = __importDefault(require("../../app/extrajudicial/services/client.service"));
const product_service_1 = __importDefault(require("../../app/extrajudicial/services/product.service"));
const config_1 = __importDefault(require("../../config/config"));
const productService = new product_service_1.default();
const clientService = new client_service_1.default();
const customerUserService = new customer_user_service_1.default();
const readXslxController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { file, customerId } = req.body;
        const productsXlsx = yield dashboard_service_1.default.readExcel(path_1.default.join(__dirname, "../../docs", `${file}`));
        const products = yield productService.getAllByCustomerId(customerId);
        const clients = yield clientService.findAllByCustomerId(customerId);
        const clientsAdded = productsXlsx
            .filter((product) => !clients.some((c) => c.id === product.clientId))
            .filter((client, index, arr) => arr.findIndex((t) => t.clientId === client.clientId) === index)
            .sort((a, b) => a.clientName.localeCompare(b.clientName));
        const clientsDeleted = clients
            .filter((client) => !productsXlsx.some((c) => c.clientId === client.id))
            .sort((a, b) => a.name.localeCompare(b.name));
        const productsAdded = productsXlsx
            .filter((product) => !products.some((p) => p.code === product.code))
            .sort((a, b) => a.clientName.localeCompare(b.clientName));
        const productsDeleted = products
            .filter((product) => !productsXlsx.some((p) => p.code === product.code))
            .sort((a, b) => String(a.clientId).localeCompare(String(b.clientId)));
        const productsCastigo = products
            .filter((product) => {
            const productFound = productsXlsx.find((obj) => obj.code === product.code);
            if (!productFound)
                return false;
            return productFound.state === "CASTIGO" && product.state === "ACTIVA";
        })
            .sort((a, b) => String(a.clientId).localeCompare(String(b.clientId)));
        res.json({
            clientsAdded,
            clientsDeleted,
            productsAdded,
            productsDeleted,
            productsCastigo,
        });
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.readXslxController = readXslxController;
const createClientsXslxController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    try {
        const { clients, customerUserId, customerHasBankId, idBank } = req.body;
        try {
            for (var _d = true, clients_1 = __asyncValues(clients), clients_1_1; clients_1_1 = yield clients_1.next(), _a = clients_1_1.done, !_a;) {
                _c = clients_1_1.value;
                _d = false;
                try {
                    const client = _c;
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = clients_1.return)) yield _b.call(clients_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        res.json({ success: "Cliente agregado" });
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.createClientsXslxController = createClientsXslxController;
const deleteClientsXslxController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, e_2, _f, _g;
    try {
        const { clients, customerHasBankId, idBank } = req.body;
        try {
            for (var _h = true, clients_2 = __asyncValues(clients), clients_2_1; clients_2_1 = yield clients_2.next(), _e = clients_2_1.done, !_e;) {
                _g = clients_2_1.value;
                _h = false;
                try {
                    const code = _g;
                    yield clientService.delete(code, customerHasBankId, idBank);
                }
                finally {
                    _h = true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_h && !_e && (_f = clients_2.return)) yield _f.call(clients_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        res.json({ success: "Cliente eliminado" });
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.deleteClientsXslxController = deleteClientsXslxController;
const createProductsXslxController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, e_3, _k, _l;
    try {
        const { products, customerUserId, customerHasBankId, idBank } = req.body;
        try {
            for (var _m = true, products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), _j = products_1_1.done, !_j;) {
                _l = products_1_1.value;
                _m = false;
                try {
                    const product = _l;
                    const client = yield clientService.findByCustomerIdAndCode(product.customerId, product.clientId);
                    if (!client) {
                        //TODO: Update logic with save service of client service
                        /* await clientService.create(
                          {
                            code: product.clientId,
                            cityId: product.cityId,
                            name: product.clientName,
                            funcionarioId: product.funcionarioId,
                            customerUserId,
                            negotiationId: 17,
                            customerHasBankId,
                          },
                          idBank
                        ); */
                    }
                    yield productService.create({
                        code: product.code,
                        customerId: product.customerId,
                        state: product.state,
                        negotiationId: product.negotiationId,
                        customerHasBankId: product.customerHasBankId,
                        clientId: product.clientId,
                        extProductNameId: product.extProductNameId,
                    });
                }
                finally {
                    _m = true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_m && !_j && (_k = products_1.return)) yield _k.call(products_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        res.json({ success: "Producto agregado" });
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.createProductsXslxController = createProductsXslxController;
const deleteProductsXslxController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, e_4, _p, _q;
    try {
        const { products } = req.body;
        console.log(products);
        try {
            for (var _r = true, products_2 = __asyncValues(products), products_2_1; products_2_1 = yield products_2.next(), _o = products_2_1.done, !_o;) {
                _q = products_2_1.value;
                _r = false;
                try {
                    const code = _q;
                    yield productService.deleteByCode(code);
                }
                finally {
                    _r = true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (!_r && !_o && (_p = products_2.return)) yield _p.call(products_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
        res.json({ success: "Producto eliminado" });
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.deleteProductsXslxController = deleteProductsXslxController;
const sendXslxController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usersId, clientsAdded, clientsDeleted, productsAdded, productsCastigo, productsDeleted, } = req.body;
        const configExcel = [
            {
                rowTitles: ["CODIGO CLIENTE", "NOMBRE"],
                workSheetName: "CLIENTES AGREGADOS",
                rowData: clientsAdded.map((item) => {
                    return [item.clientId, item.clientName];
                }),
            },
            {
                rowTitles: ["CODIGO CLIENTE", "NOMBRE"],
                workSheetName: "CLIENTES ELIMINADOS",
                rowData: clientsDeleted.map((item) => {
                    return [item.code, item.name];
                }),
            },
            {
                rowTitles: [
                    "CODIGO CLIENTE",
                    "NOMBRE CLIENTE",
                    "CÓDIGO PRODUCTO",
                    "NOMBRE PRODUCTO",
                    "ESTADO",
                ],
                workSheetName: "PRODUCTOS AGREGADOS",
                rowData: productsAdded.map((item) => {
                    return [item.clientId, item.clientName, item.code, item.state];
                }),
            },
            {
                rowTitles: ["CODIGO CLIENTE", "CODIGO PRODUCTO", "NOMBRE PRODUCTO"],
                workSheetName: "PRODUCTOS ELIMINADOS",
                rowData: productsDeleted.map((item) => {
                    return [item.clientId, item.code];
                }),
            },
            {
                rowTitles: [
                    "CODIGO CLIENTE",
                    "CODIGO PRODUCTO",
                    "NOMBRE PRODUCTO",
                    "ESTADO",
                ],
                workSheetName: "PRODUCTOS CASTIGO",
                rowData: productsCastigo.map((item) => {
                    return [item.clientId, item.code, item.state];
                }),
            },
        ];
        const excel = yield dashboard_service_1.default.createExcel(configExcel);
        const fileContent = fs.readFileSync(excel);
        const transport = nodemailer.createTransport({
            host: config_1.default.AWS_EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: config_1.default.AWS_EMAIL_USER,
                pass: config_1.default.AWS_EMAIL_PASSWORD,
            },
        });
        for (const id of usersId) {
            const user = yield customerUserService.findOne(id);
            const message = {
                from: config_1.default.AWS_EMAIL,
                to: user.dataValues.email,
                subject: "Reporte en Excel sobre el portafolio de clientes",
                text: "El archivo en excel adjuntado contiene información relevante sobre la gestión para los clientes.",
                attachments: [
                    {
                        filename: "Archivo.xlsx",
                        content: fileContent,
                        contentType: "application/vnd.ms-excel",
                    },
                ],
            };
            transport.sendMail(message, (error, info) => {
                console.log(error);
                console.log(info);
            });
        }
        return res.json({ success: "Email enviado" });
    }
    catch (error) {
        next(boom_1.default.badRequest(error.message));
    }
});
exports.sendXslxController = sendXslxController;

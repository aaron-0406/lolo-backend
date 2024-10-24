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
class ProductService {
    constructor() { }
    //INFO: CLIENTS SECTION
    getByClientId(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.PRODUCT.findAll({
                where: {
                    client_id: clientId,
                },
                include: [
                    { model: models.NEGOTIATION, as: "negotiation" },
                    {
                        model: models.EXT_PRODUCT_NAME,
                        as: "extProductName",
                        attributes: ["id", "productName", "customerHasBankId"],
                    },
                    {
                        model: models.JUDICIAL_CASE_FILE,
                        as: "judicialCaseFile",
                        attributes: ["id", "numberCaseFile"],
                    },
                ],
            });
            return JSON.parse(JSON.stringify(rta));
        });
    }
    getByProductId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield models.PRODUCT.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: models.NEGOTIATION,
                        as: "negotiation",
                        attributes: ["name", "customerHasBankId"],
                    },
                    {
                        model: models.EXT_PRODUCT_NAME,
                        as: "extProductName",
                        attributes: ["id", "productName", "customerHasBankId"],
                    },
                    {
                        model: models.JUDICIAL_CASE_FILE,
                        as: "judicialCaseFile",
                        attributes: ["id", "numberCaseFile"],
                    },
                ],
            });
            if (!product)
                throw boom_1.default.notFound("Producto no encontrado");
            return product;
        });
    }
    //INFO: JUDICIAL - CASE FILE SECTION
    getByJudicialCaseFileId(judicialCaseFileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.PRODUCT.findAll({
                where: {
                    judicial_case_file_id_judicial_case_file: judicialCaseFileId,
                },
                include: [
                    { model: models.NEGOTIATION, as: "negotiation" },
                    {
                        model: models.EXT_PRODUCT_NAME,
                        as: "extProductName",
                        attributes: ["id", "productName", "customerHasBankId"],
                    },
                    {
                        model: models.JUDICIAL_CASE_FILE,
                        as: "judicialCaseFile",
                        attributes: ["id", "numberCaseFile"],
                    },
                ],
            });
            return JSON.parse(JSON.stringify(rta));
        });
    }
    assignJudicialCaseFileToProducts(productIds, judicialCaseFileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const listProducts = JSON.parse(productIds);
            for (const productId of listProducts) {
                yield models.PRODUCT.update({ judicialCaseFileId }, { where: { id: productId } });
            }
            return this.getByJudicialCaseFileId(judicialCaseFileId);
        });
    }
    removeJudicialCaseFileFromProduct(productRemovedId, judicialCaseFileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldProduct = yield models.PRODUCT.update({ judicialCaseFileId: null }, {
                where: {
                    id: productRemovedId,
                    judicial_case_file_id_judicial_case_file: judicialCaseFileId,
                },
            });
            return { id: productRemovedId, oldProduct };
        });
    }
    //INFO: DASHBOARD SECTION
    getByProductCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield models.PRODUCT.findOne({
                where: {
                    code,
                },
                include: [
                    { model: models.NEGOTIATION, as: "negotiation" },
                    {
                        model: models.EXT_PRODUCT_NAME,
                        as: "extProductName",
                        attributes: ["id", "productName", "customerHasBankId"],
                    },
                    {
                        model: models.JUDICIAL_CASE_FILE,
                        as: "judicialCaseFile",
                        attributes: ["id", "numberCaseFile"],
                    },
                ],
            });
            return product;
        });
    }
    getAllByCustomerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.PRODUCT.findAll({
                where: {
                    customerId: id,
                },
            });
            return JSON.parse(JSON.stringify(rta));
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const pdc = yield models.PRODUCT.findOne({
                where: {
                    code: product.code,
                    customerId: product.customerId,
                },
            });
            if (!pdc) {
                const newProduct = yield models.PRODUCT.create(product);
                yield newProduct.reload({
                    include: [
                        {
                            model: models.NEGOTIATION,
                            as: "negotiation",
                            attributes: ["name", "customerHasBankId"],
                        },
                        {
                            model: models.EXT_PRODUCT_NAME,
                            as: "extProductName",
                            attributes: ["id", "productName", "customerHasBankId"],
                        },
                        {
                            model: models.JUDICIAL_CASE_FILE,
                            as: "judicialCaseFile",
                            attributes: ["id", "numberCaseFile"],
                        },
                    ],
                });
                return newProduct;
            }
            throw boom_1.default.notFound("El código de producto ya existe");
        });
    }
    update(product, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productFound = yield this.getByProductId(id);
            const oldProduct = Object.assign({}, productFound.get());
            yield productFound.update(product);
            const productEdited = yield this.getByProductId(id);
            return { oldProduct, productEdited };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.getByProductId(id);
            const oldProduct = Object.assign({}, product.get());
            yield product.destroy();
            return oldProduct;
        });
    }
    deleteByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.getByProductCode(code);
            if (product)
                yield product.destroy();
            return Number(code);
        });
    }
}
exports.default = ProductService;

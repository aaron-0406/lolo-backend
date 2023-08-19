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
    getByClientCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.PRODUCT.findAll({
                where: {
                    clientCode: code,
                },
            });
            return JSON.parse(JSON.stringify(rta));
        });
    }
    getByProductCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield models.PRODUCT.findOne({
                where: {
                    code,
                },
            });
            // if (!product) throw boom.notFound("Producto no encontrado");
            return product;
        });
    }
    getByProductId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield models.PRODUCT.findOne({
                where: {
                    id,
                },
            });
            if (!product)
                throw boom_1.default.notFound("Producto no encontrado");
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
            const newProduct = yield models.PRODUCT.create(product);
            return newProduct;
        });
    }
    update(product, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productFound = yield this.getByProductId(id);
            yield productFound.update(product);
            const productEdited = yield this.getByProductId(id);
            return productEdited;
        });
    }
    change(product, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productFound = yield this.getByProductId(id);
            yield productFound.update(product);
            return product;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.getByProductId(id);
            yield product.destroy();
            return Number(id);
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

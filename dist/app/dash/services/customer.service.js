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
const aws_bucket_1 = require("../../../libs/aws_bucket");
const config_1 = __importDefault(require("../../../config/config"));
const { models } = sequelize_1.default;
class CustomerService {
    constructor() { }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CUSTOMER.findAll({
                include: ["customerBanks"],
            });
            return rta;
        });
    }
    findOne(urlIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield models.CUSTOMER.findOne({
                where: {
                    url_identifier: urlIdentifier,
                },
                include: ["customerBanks"],
            });
            if (!customer) {
                throw boom_1.default.notFound("Cliente no encontrado");
            }
            if (!customer.dataValues.state)
                throw boom_1.default.notFound("Cliente inhabilitado");
            return customer;
        });
    }
    findOneByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield models.CUSTOMER.findOne({
                where: {
                    id_customer: id,
                },
            });
            if (!customer) {
                throw boom_1.default.notFound("Cliente no encontrado");
            }
            return customer;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCustomer = yield models.CUSTOMER.create(data);
            yield (0, aws_bucket_1.createFolder)(`${config_1.default.AWS_PLANTILLA_PATH}${newCustomer.dataValues.id}/`);
            return newCustomer;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.findOneByID(id);
            const rta = yield customer.update(changes);
            return rta;
        });
    }
    updateState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.findOneByID(id);
            const rta = yield customer.update(Object.assign(Object.assign({}, customer), { state }));
            return rta;
        });
    }
    updateScreapperState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.findOneByID(id);
            const rta = yield customer.update(Object.assign(Object.assign({}, customer), { isScrapperActive: state }));
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.findOneByID(id);
            yield customer.destroy();
            return { id };
        });
    }
}
exports.default = CustomerService;

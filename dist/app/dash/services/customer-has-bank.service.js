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
class CustomerHasBankService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CUSTOMER_HAS_BANK.findAll();
            return rta;
        });
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerBank = yield models.CUSTOMER_HAS_BANK.findByPk(id);
            if (!customerBank) {
                throw boom_1.default.notFound("CHB no encontrado");
            }
            return customerBank;
        });
    }
    findAllByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CUSTOMER_HAS_BANK.findAll({
                where: {
                    customer_id_customer: customerId,
                },
                include: ["bank"],
            });
            if (!rta) {
                throw boom_1.default.notFound("El cliente no tiene bancos asignados");
            }
            return rta;
        });
    }
    assign(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerBank = yield models.CUSTOMER_HAS_BANK.findOne({
                where: {
                    customer_id_customer: data.idCustomer,
                    bank_id_bank: data.idBank,
                },
            });
            if (!customerBank) {
                const newCustomerBank = yield models.CUSTOMER_HAS_BANK.create(data);
                yield (0, aws_bucket_1.createFolder)(`${config_1.default.AWS_CHB_PATH}${newCustomerBank.dataValues.idCustomer}/${newCustomerBank.dataValues.id}/`);
                return newCustomerBank;
            }
            throw boom_1.default.notFound("Banco ya asignado");
        });
    }
    revoke(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerBank = yield this.findOneById(id);
            //TODO: Remove folder of AWS
            yield customerBank.destroy();
            return { id };
        });
    }
}
exports.default = CustomerHasBankService;

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
    findOne(idCustomer, idBank) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerBank = yield models.CUSTOMER_HAS_BANK.findOne({
                where: {
                    customer_id_customer: idCustomer,
                    bank_id_bank: idBank,
                },
            });
            if (!customerBank) {
                throw boom_1.default.notFound("Cliente o Banco no encontrado");
            }
            return customerBank;
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
            throw boom_1.default.notFound("Datos ya registrados");
        });
    }
    delete(idCustomer, idBank) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerBank = yield this.findOne(idCustomer, idBank);
            yield customerBank.destroy();
            return { idCustomer, idBank };
        });
    }
}
exports.default = CustomerHasBankService;

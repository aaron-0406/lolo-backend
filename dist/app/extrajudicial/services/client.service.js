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
    findAllCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.CLIENT.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
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
    create(data, idBank) {
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
            yield (0, aws_bucket_1.createFolder)(`${config_1.default.AWS_BANK_PATH}${idBank}/${data.code}/`);
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
    delete(code, chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.findCode(code, chb);
            yield client.destroy();
            return { code };
        });
    }
}
exports.default = ClientService;

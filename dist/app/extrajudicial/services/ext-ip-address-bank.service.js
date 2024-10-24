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
class ExtIpAddressBankService {
    constructor() { }
    findAllByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.EXT_IP_ADDRESS_BANK.findAll({
                where: {
                    customer_id_customer: customerId,
                },
            });
            return rta;
        });
    }
    findByID(id, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const extIpAddress = yield models.EXT_IP_ADDRESS_BANK.findOne({
                where: {
                    id,
                    customer_id_customer: customerId,
                },
            });
            if (!extIpAddress) {
                throw boom_1.default.notFound("Dirección de IP no encontrada");
            }
            return extIpAddress;
        });
    }
    findByIP(ip, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const extIpAddress = yield models.EXT_IP_ADDRESS_BANK.findOne({
                where: {
                    ip,
                    customer_id_customer: customerId,
                },
            });
            if (!extIpAddress) {
                throw boom_1.default.notFound("IP no encontrada");
            }
            return extIpAddress;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newExtIpAddress = yield models.EXT_IP_ADDRESS_BANK.create(data);
            return newExtIpAddress;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const extIpAddress = yield this.findByID(id, String(changes.customerId));
            const oldExtIpAddress = Object.assign({}, extIpAddress.get());
            const newExtIpAddress = yield extIpAddress.update(changes);
            return { oldExtIpAddress, newExtIpAddress };
        });
    }
    updateState(id, customerId, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const extIpAddress = yield this.findByID(id, customerId);
            const oldExtIpAddress = Object.assign({}, extIpAddress.get());
            const newExtIpAddress = yield extIpAddress.update(Object.assign(Object.assign({}, extIpAddress), { state }));
            return { oldExtIpAddress, newExtIpAddress };
        });
    }
    delete(id, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const extIpAddress = yield this.findByID(id, customerId);
            const oldExtIpAddress = Object.assign({}, extIpAddress.get());
            yield extIpAddress.destroy();
            return oldExtIpAddress;
        });
    }
}
exports.default = ExtIpAddressBankService;

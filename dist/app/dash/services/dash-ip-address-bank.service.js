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
class DashIpAddressBankService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.DASH_IP_ADDRESS_BANK.findAll();
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dashIpAddress = yield models.DASH_IP_ADDRESS_BANK.findByPk(id);
            if (!dashIpAddress) {
                throw boom_1.default.notFound("Dirección no encontrado");
            }
            return dashIpAddress;
        });
    }
    findByIP(ip) {
        return __awaiter(this, void 0, void 0, function* () {
            const dashIpAddress = yield models.DASH_IP_ADDRESS_BANK.findOne({
                where: {
                    ip,
                },
            });
            if (!dashIpAddress) {
                throw boom_1.default.notFound("Dirección no encontrado");
            }
            return dashIpAddress;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDashIpAddress = yield models.DASH_IP_ADDRESS_BANK.create(data);
            return newDashIpAddress;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const dashIpAddress = yield this.findByID(id);
            const rta = yield dashIpAddress.update(changes);
            return rta;
        });
    }
    updateState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const dashIpAddress = yield this.findByID(id);
            const rta = yield dashIpAddress.update(Object.assign(Object.assign({}, dashIpAddress), { state }));
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dashIpAddress = yield this.findByID(id);
            yield dashIpAddress.destroy();
            return { id };
        });
    }
}
exports.default = DashIpAddressBankService;

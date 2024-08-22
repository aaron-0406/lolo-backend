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
class JudicialBinNotificationService {
    constructor() { }
    findAllByBinnacleId(binnacleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_BIN_NOTIFICATION.findAll({
                where: {
                    idJudicialBinacle: binnacleId,
                },
                attributes: {
                    exclude: ["judicialBinnacleId"],
                },
            });
            if (!rta)
                throw boom_1.default.notFound("No se encontraron notificaciones");
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinNotification = yield models.JUDICIAL_BIN_NOTIFICATION.findOne({
                where: {
                    id,
                },
            });
            if (!judicialBinNotification) {
                throw boom_1.default.notFound("Notificaciones no encontradas");
            }
            return judicialBinNotification;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialBinNotification = yield models.JUDICIAL_BIN_NOTIFICATION.create(data);
            return newJudicialBinNotification;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinNotification = yield this.findByID(id);
            const oldData = Object.assign({}, judicialBinNotification.get());
            const newData = (yield judicialBinNotification.update(changes)).dataValues;
            return { oldData, newData };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinNotification = yield this.findByID(id);
            const oldData = Object.assign({}, judicialBinNotification.get());
            yield judicialBinNotification.destroy();
            return { oldData };
        });
    }
}
exports.default = JudicialBinNotificationService;

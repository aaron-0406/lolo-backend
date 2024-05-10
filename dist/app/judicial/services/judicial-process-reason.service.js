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
class judicialProcessReasonService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_PROCESS_REASON.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_PROCESS_REASON.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
            });
            if (!rta) {
                throw boom_1.default.notFound("Motivos no encontrados");
            }
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialProcessReason = yield models.JUDICIAL_PROCESS_REASON.findOne({
                where: {
                    id_judicial_process_status_reason: id,
                },
            });
            if (!judicialProcessReason) {
                throw boom_1.default.notFound("Motivo del proceso no encontrado");
            }
            return judicialProcessReason;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialProcessReason = yield models.JUDICIAL_PROCESS_REASON.create(data);
            return newJudicialProcessReason;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialProcessReason = yield this.findByID(id);
            const rta = yield judicialProcessReason.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialProcessReason = yield this.findByID(id);
            yield judicialProcessReason.destroy();
            return { id };
        });
    }
}
exports.default = judicialProcessReasonService;

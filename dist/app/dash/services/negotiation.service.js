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
class NegotiationService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.NEGOTIATION.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.NEGOTIATION.findAll({
                where: {
                    customer_has_bank_id_customer_has_bank: chb,
                },
                include: [
                    {
                        model: models.CUSTOMER_HAS_BANK,
                        as: "customerHasBank",
                    },
                ],
                order: [["name", "ASC"]],
            });
            return rta;
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const negotiation = yield models.NEGOTIATION.findByPk(id);
            if (!negotiation) {
                throw boom_1.default.notFound("Negociación no encontrada");
            }
            return negotiation;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newNegotiation = yield models.NEGOTIATION.create(data);
            return newNegotiation;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const negotiation = yield this.findOne(id);
            const oldNegotiation = Object.assign({}, negotiation.get());
            const newNegotiation = yield negotiation.update(changes);
            return { oldNegotiation, newNegotiation };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const negotiation = yield this.findOne(id);
            const oldNegotiation = Object.assign({}, negotiation.get());
            yield negotiation.destroy();
            return oldNegotiation;
        });
    }
}
exports.default = NegotiationService;

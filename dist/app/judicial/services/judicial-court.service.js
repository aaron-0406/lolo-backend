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
class JudicialCourtService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_COURT.findAll();
            return rta;
        });
    }
    findAllByCHB(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_COURT.findAll({
                where: { customerHasBankId: chb },
                include: [
                    {
                        model: models.CITY,
                        as: "city",
                        attributes: ["id", "name"],
                    },
                ],
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCourt = yield models.JUDICIAL_COURT.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        model: models.CITY,
                        as: "city",
                        attributes: ["id", "name"],
                    },
                ],
            });
            if (!judicialCourt) {
                throw boom_1.default.notFound("Juzgado no encontrado");
            }
            return judicialCourt;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialCourt = yield models.JUDICIAL_COURT.create(data);
            yield newJudicialCourt.reload({
                include: {
                    model: models.CITY,
                    as: "city",
                    attributes: ["id", "name"],
                },
            });
            return newJudicialCourt;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCourt = yield this.findByID(id);
            const oldJudicialCourt = Object.assign({}, judicialCourt.get());
            const newJudicialCourt = yield judicialCourt.update(changes);
            yield newJudicialCourt.reload({
                include: {
                    model: models.CITY,
                    as: "city",
                    attributes: ["id", "name"],
                },
            });
            return { oldJudicialCourt, newJudicialCourt };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const court = yield this.findByID(id);
            const oldJudicialCourt = Object.assign({}, court.get());
            yield court.destroy();
            return oldJudicialCourt;
        });
    }
}
exports.default = JudicialCourtService;

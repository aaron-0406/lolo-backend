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
class JudicialCaseFileService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_CASE_FILE.findAll();
            return rta;
        });
    }
    findAllByClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.JUDICIAL_CASE_FILE.findAll({
                where: {
                    clientId,
                },
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findOne({
                where: {
                    id,
                },
            });
            if (!judicialCaseFile) {
                throw boom_1.default.notFound("Expediente no encontrado");
            }
            return judicialCaseFile;
        });
    }
    findByNumberCaseFile(numberCaseFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findOne({
                where: {
                    numberCaseFile,
                },
            });
            if (!judicialCaseFile) {
                throw boom_1.default.notFound("Expediente no encontrado");
            }
            return judicialCaseFile;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialCaseFile = yield models.JUDICIAL_CASE_FILE.create(data);
            return newJudicialCaseFile;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCaseFile = yield this.findByID(id);
            const rta = yield judicialCaseFile.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.findByID(id);
            yield client.destroy();
            return { id };
        });
    }
}
exports.default = JudicialCaseFileService;

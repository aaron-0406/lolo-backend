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
class DirectionService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.DIRECTION.findAll();
            return rta;
        });
    }
    findAllByClient(clientID) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.DIRECTION.findAll({
                where: {
                    client_id_client: clientID,
                },
                include: [
                    {
                        model: models.EXT_ADDRESS_TYPE,
                        as: "addressType",
                        attributes: ["type"],
                    },
                ],
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const direction = yield models.DIRECTION.findOne({
                where: {
                    id_direction: id,
                },
                include: [
                    {
                        model: models.EXT_ADDRESS_TYPE,
                        as: "addressType",
                        attributes: ["type", "customerHasBankId"],
                    },
                ],
            });
            if (!direction)
                throw boom_1.default.notFound("Dirección no encontrada");
            return direction;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDirection = yield models.DIRECTION.create(data);
            yield newDirection.reload({
                include: [
                    {
                        model: models.EXT_ADDRESS_TYPE,
                        as: "addressType",
                        attributes: ["type"],
                    },
                ],
            });
            return newDirection;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const direction = yield this.findByID(id);
            const rta = yield direction.update(changes);
            yield rta.reload({
                include: [
                    {
                        model: models.EXT_ADDRESS_TYPE,
                        as: "addressType",
                        attributes: ["type"],
                    },
                ],
            });
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const direction = yield this.findByID(id);
            yield direction.destroy();
            return { id };
        });
    }
}
exports.default = DirectionService;

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
const helpers_1 = require("../../../libs/helpers");
const sequelize_2 = require("sequelize");
const { models } = sequelize_1.default;
class CommentService {
    constructor() { }
    findAllByClient(clientID) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.COMMENT.findAll({
                where: {
                    client_id_client: clientID,
                },
                include: [
                    {
                        model: models.CUSTOMER_USER,
                        as: "customerUser",
                        attributes: ["name"],
                    },
                ],
                order: [["id", "DESC"]],
            });
            return rta;
        });
    }
    findAllByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.COMMENT.findAll({
                where: {
                    date,
                },
                include: [
                    {
                        model: models.CLIENT,
                        as: "client",
                        attributes: ["code", "name"],
                    },
                ],
            });
            return JSON.parse(JSON.stringify(rta));
        });
    }
    chart(clientID) {
        return __awaiter(this, void 0, void 0, function* () {
            const hoy = new Date();
            const primerDia = (0, helpers_1.formatDate)(new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 1)));
            const ultimoDia = (0, helpers_1.formatDate)(new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 7)));
            const rta = yield models.COMMENT.findAll({
                attributes: [
                    [sequelize_1.default.literal("DATE(date)"), "fecha"],
                    [sequelize_1.default.fn("COUNT", sequelize_1.default.col("date")), "cantidad"],
                ],
                group: ["date"],
                where: {
                    customer_user_id_customer_user: clientID,
                    date: {
                        [sequelize_2.Op.between]: [primerDia, ultimoDia],
                    },
                },
            });
            return JSON.parse(JSON.stringify(rta));
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield models.COMMENT.findOne({
                where: {
                    id_comment: id,
                },
                include: [
                    {
                        model: models.CUSTOMER_USER,
                        as: "customerUser",
                        attributes: ["name"],
                    },
                ],
            });
            if (!comment) {
                throw boom_1.default.notFound("Comment no encontrado");
            }
            return comment;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newComment = yield models.COMMENT.create(data);
            const commentFound = yield this.findByID(newComment.dataValues.id);
            return commentFound;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.findByID(id);
            const rta = yield comment.update(changes);
            const commentFound = yield this.findByID(rta.dataValues.id);
            return commentFound;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield this.findByID(id);
            yield comment.destroy();
            return { id };
        });
    }
}
exports.default = CommentService;

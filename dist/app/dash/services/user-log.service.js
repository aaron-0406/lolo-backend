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
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../libs/sequelize"));
const { models } = sequelize_2.default;
class UserLogService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.USER_LOG.findAll();
            return rta;
        });
    }
    findAllByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.USER_LOG.findAll({
                where: {
                    customer_id_customer: customerId,
                },
                include: ["customerUser"],
                order: [["id", "DESC"]],
            });
            return rta;
        });
    }
    findByCustomerId(customerId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, page, actions, users, initialDate, finalDate } = query;
            const limite = parseInt(limit, 10);
            const pagina = parseInt(page, 10);
            const listActions = JSON.parse(actions);
            const listUsers = JSON.parse(users);
            const initial = JSON.parse(initialDate)
                ? new Date(initialDate).setHours(0, 0, 0, 0)
                : undefined;
            const final = JSON.parse(finalDate)
                ? new Date(finalDate).setHours(0, 0, 0, 0)
                : undefined;
            const filters = {};
            if (listActions.length) {
                filters.codeAction = { [sequelize_1.Op.in]: listActions };
            }
            if (listUsers.length) {
                filters.customer_user_id_customer_user = { [sequelize_1.Op.in]: listUsers };
            }
            if (initial && final) {
                filters.createAt = { [sequelize_1.Op.between]: [initial, final] };
            }
            if (final && !initial) {
                filters.createAt = { [sequelize_1.Op.lte]: final };
            }
            if (initial && !final) {
                filters.createAt = { [sequelize_1.Op.gte]: initial };
            }
            let filtersWhere = {
                customer_id_customer: customerId,
            };
            if (Object.keys(filters).length > 0) {
                filtersWhere = {
                    [sequelize_1.Op.or]: [filters],
                    customer_id_customer: customerId,
                };
            }
            const quantity = yield models.USER_LOG.count({
                where: filtersWhere,
            });
            const logs = yield models.USER_LOG.findAll({
                include: ["customerUser"],
                order: [["id", "DESC"]],
                limit: limite,
                offset: (pagina - 1) * limite,
                where: filtersWhere,
            });
            return { logs, quantity };
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUserLog = yield models.USER_LOG.create(data);
            return newUserLog;
        });
    }
}
exports.default = UserLogService;

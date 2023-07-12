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
const { models } = sequelize_1.default;
class GoalService {
    constructor() { }
    findAll(customerId, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, page } = opts;
            const rtaCount = yield models.GOAL.count({
                where: {
                    customerId,
                },
            });
            const query = `
      SELECT 
        id_goal as id,
        start_date as startDate,
        end_date as endDate,
        week,
        customer_id_customer as customerId,
        (SELECT COUNT(*) FROM comment c WHERE c.customer_user_id_customer_user IN (SELECT id_customer FROM Customer WHERE id_customer = g.customer_id_customer) AND c.date BETWEEN g.start_date AND g.end_date) as total,
        CAST(IFNULL((SELECT SUM(quantity) FROM goal_user gu WHERE gu.goal_id_goal = g.id_goal),0) AS UNSIGNED) AS totalMeta
      FROM Goal g 
      WHERE customer_id_customer = ${customerId} 
      ORDER BY g.id_goal DESC 
      LIMIT ${(page - 1) * limit}, ${limit}  
    `;
            const goals = yield sequelize_1.default.query(query);
            return { goals: goals[0], quantity: rtaCount };
        });
    }
    findByID(goalId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT 
        id_goal as id,
        start_date as startDate,
        end_date as endDate,
        week,
        customer_id_customer as customerId,
        (SELECT COUNT(*) FROM comment c WHERE c.customer_user_id_customer_user IN (SELECT id_customer FROM Customer WHERE id_customer = g.customer_id_customer) AND c.date BETWEEN g.start_date AND g.end_date) as total,
        CAST(IFNULL((SELECT SUM(quantity) FROM goal_user gu WHERE gu.goal_id_goal = g.id_goal),0) AS UNSIGNED) AS totalMeta
      FROM Goal g 
      WHERE customer_id_customer = ${customerId} AND g.id_goal = ${goalId}
    `;
            const goals = yield sequelize_1.default.query(query);
            if (!goals[0][0])
                throw boom_1.default.notFound("Meta no encontrada");
            return goals[0][0];
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { week, startDate } = data;
            const firstDay = (0, helpers_1.getFirstDayOfWeek)();
            const { day, month, year } = (0, helpers_1.extractDate)(startDate + "");
            const date = new Date();
            date.setFullYear(year);
            date.setMonth(month);
            date.setDate(day);
            if (date < firstDay)
                throw boom_1.default.badData("La fecha de inicio de no puede ser menor a la semana actual");
            const lastDay = (0, helpers_1.getLastDayOfWeek)();
            const lastDayWeeks = (0, helpers_1.sumarDias)(lastDay, (week - 1) * 7);
            const newGoal = yield models.GOAL.create(Object.assign(Object.assign({}, data), { startDate: firstDay, endDate: lastDayWeeks }));
            const customerUsers = yield models.CUSTOMER_USER.findAll({
                where: {
                    customerId: data.customerId,
                },
            });
            for (let i = 0; i < customerUsers.length; i++) {
                const customerUser = customerUsers[i];
                yield models.GOAL_USER.create({
                    quantity: 0,
                    goalId: newGoal.dataValues.id,
                    customerUserId: customerUser.dataValues.id,
                });
            }
            const goalFound = yield this.findByID(newGoal.dataValues.id, data.customerId);
            return goalFound;
        });
    }
    update(id, customerId, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const { week, startDate } = changes;
            const firstDay = (0, helpers_1.getFirstDayOfWeek)();
            const { day, month, year } = (0, helpers_1.extractDate)(startDate + "");
            const date = new Date();
            date.setFullYear(year);
            date.setMonth(month);
            date.setDate(day);
            if (date < firstDay)
                throw boom_1.default.badData("La fecha de inicio de no puede ser menor a la semana actual");
            const lastDay = (0, helpers_1.getLastDayOfWeek)();
            const lastDayWeeks = (0, helpers_1.sumarDias)(lastDay, (week - 1) * 7);
            const goal = yield this.findByID(id, customerId);
            const rta = yield goal.update(Object.assign(Object.assign({}, changes), { startDate: firstDay, endDate: lastDayWeeks }));
            return rta;
        });
    }
    delete(id, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const goal = yield this.findByID(id, customerId);
            yield goal.destroy();
            return { id };
        });
    }
}
exports.default = GoalService;
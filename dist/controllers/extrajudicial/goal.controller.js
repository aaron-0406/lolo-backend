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
exports.deleteGoalController = exports.updateGoalController = exports.updateCustomerUserGoals = exports.getCustomerUserGoal = exports.getCustomerUsersGoals = exports.getGoalGlobalController = exports.getGoalByIdController = exports.getGoalController = exports.createGoalController = void 0;
const goal_service_1 = __importDefault(require("../../app/extrajudicial/services/goal.service"));
const goal_user_service_1 = __importDefault(require("../../app/extrajudicial/services/goal-user.service"));
const boom_1 = __importDefault(require("@hapi/boom"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const goal_model_1 = __importDefault(require("../../db/models/goal.model"));
const goalService = new goal_service_1.default();
const goalUserService = new goal_user_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { GOAL_TABLE } = goal_model_1.default;
const createGoalController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const goal = yield goalService.create(Object.assign(Object.assign({}, req.body), { customerId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.customerId) }));
        yield serviceUserLog.create({
            customerUserId: Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.id),
            codeAction: "P04-01",
            entity: GOAL_TABLE,
            entityId: Number(goal.id),
            ip: (_c = req.clientIp) !== null && _c !== void 0 ? _c : "",
            customerId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.customerId),
        });
        return res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
exports.createGoalController = createGoalController;
const getGoalController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const { limit, page } = req.query;
        const limite = Number(limit);
        const pagina = Number(page);
        const goals = yield goalService.findAll(Number((_e = req.user) === null || _e === void 0 ? void 0 : _e.customerId), {
            limit: limite,
            page: pagina,
        });
        return res.json(goals);
    }
    catch (error) {
        next(error);
    }
});
exports.getGoalController = getGoalController;
const getGoalByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const goal = yield goalService.findByID(Number(req.params.id), Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId));
        return res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
exports.getGoalByIdController = getGoalByIdController;
const getGoalGlobalController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const goal = yield goalService.finGlobalGoal(Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.customerId));
        if (!goal)
            throw boom_1.default.notFound("Meta no encontrada");
        return res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
exports.getGoalGlobalController = getGoalGlobalController;
const getCustomerUsersGoals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerUsers = yield goalService.findCustomerUserByGoalId(Number(req.params.goalId));
        return res.json(customerUsers);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerUsersGoals = getCustomerUsersGoals;
const getCustomerUserGoal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const customerGoal = yield goalService.findGoalUserByCustomerId(Number((_h = req.user) === null || _h === void 0 ? void 0 : _h.id));
        return res.json(customerGoal);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerUserGoal = getCustomerUserGoal;
const updateCustomerUserGoals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m;
    try {
        for (let i = 0; i < req.body.length; i++) {
            const element = req.body[i];
            yield goalUserService.updateGoalUser(element.id, element.quantity);
        }
        const goal = yield goalService.findByID(Number(req.params.goalId), Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId));
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P04-04",
            entity: GOAL_TABLE,
            entityId: Number(goal.id),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
        });
        res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCustomerUserGoals = updateCustomerUserGoals;
const updateGoalController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q, _r;
    try {
        const goal = yield goalService.update(Number(req.params.id), Number((_o = req.user) === null || _o === void 0 ? void 0 : _o.customerId), req.body);
        yield serviceUserLog.create({
            customerUserId: Number((_p = req.user) === null || _p === void 0 ? void 0 : _p.id),
            codeAction: "P04-02",
            entity: GOAL_TABLE,
            entityId: Number(goal.id),
            ip: (_q = req.clientIp) !== null && _q !== void 0 ? _q : "",
            customerId: Number((_r = req.user) === null || _r === void 0 ? void 0 : _r.customerId),
        });
        return res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
exports.updateGoalController = updateGoalController;
const deleteGoalController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _s, _t, _u;
    try {
        const goal = yield goalService.delete(Number(req.params.id));
        yield serviceUserLog.create({
            customerUserId: Number((_s = req.user) === null || _s === void 0 ? void 0 : _s.id),
            codeAction: "P04-03",
            entity: GOAL_TABLE,
            entityId: Number(goal.dataValues.id),
            ip: (_t = req.clientIp) !== null && _t !== void 0 ? _t : "",
            customerId: Number((_u = req.user) === null || _u === void 0 ? void 0 : _u.customerId),
        });
        return res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteGoalController = deleteGoalController;

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
exports.deleteGoalController = exports.updateGoalController = exports.getGoalByIdController = exports.getGoalController = exports.createGoalController = void 0;
const goal_service_1 = __importDefault(require("../app/extrajudicial/services/goal.service"));
const goalService = new goal_service_1.default();
const createGoalController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const goal = yield goalService.create(Object.assign(Object.assign({}, req.body), { customerId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.customerId) }));
        return res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
exports.createGoalController = createGoalController;
const getGoalController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { limit, page } = req.query;
        const limite = Number(limit);
        const pagina = Number(page);
        const goals = yield goalService.findAll(Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.customerId), {
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
    var _c;
    try {
        const goal = yield goalService.findByID(Number(req.params.id), Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId));
        return res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
exports.getGoalByIdController = getGoalByIdController;
const updateGoalController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const goal = yield goalService.update(Number(req.params.id), Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.customerId), req.body);
        return res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
exports.updateGoalController = updateGoalController;
const deleteGoalController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const goal = yield goalService.delete(Number(req.params.id), Number((_e = req.user) === null || _e === void 0 ? void 0 : _e.customerId));
        return res.json(goal);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteGoalController = deleteGoalController;

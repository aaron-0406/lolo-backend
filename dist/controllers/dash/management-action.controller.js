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
exports.deleteManagementActionController = exports.updateManagementActionController = exports.createManagementActionController = exports.getManagementActionByIdController = exports.getManagementActionByCHBController = exports.getManagementActionsController = void 0;
const management_action_service_1 = __importDefault(require("../../app/dash/services/management-action.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const management_action_model_1 = __importDefault(require("../../db/models/management-action.model"));
const service = new management_action_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { MANAGEMENT_ACTION_TABLE } = management_action_model_1.default;
const getManagementActionsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const managementActions = yield service.findAll();
        res.json(managementActions);
    }
    catch (error) {
        next(error);
    }
});
exports.getManagementActionsController = getManagementActionsController;
const getManagementActionByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const managementActions = yield service.findAllByCHB(chb);
        res.json(managementActions);
    }
    catch (error) {
        next(error);
    }
});
exports.getManagementActionByCHBController = getManagementActionByCHBController;
const getManagementActionByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const managementAction = yield service.findOne(id);
        res.json(managementAction);
    }
    catch (error) {
        next(error);
    }
});
exports.getManagementActionByIdController = getManagementActionByIdController;
const createManagementActionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newManagementAction = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P07-01",
            entity: MANAGEMENT_ACTION_TABLE,
            entityId: Number(newManagementAction.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newManagementAction);
    }
    catch (error) {
        next(error);
    }
});
exports.createManagementActionController = createManagementActionController;
const updateManagementActionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { id } = req.params;
        const body = req.body;
        const managementAction = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P07-02",
            entity: MANAGEMENT_ACTION_TABLE,
            entityId: Number(managementAction.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(managementAction);
    }
    catch (error) {
        next(error);
    }
});
exports.updateManagementActionController = updateManagementActionController;
const deleteManagementActionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P07-03",
            entity: MANAGEMENT_ACTION_TABLE,
            entityId: Number(id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteManagementActionController = deleteManagementActionController;

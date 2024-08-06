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
exports.deleteRoleController = exports.updateRoleController = exports.createRoleController = exports.getRoleByIdController = exports.getAllRoleByCustomerIdController = void 0;
const role_service_1 = __importDefault(require("../../app/dash/services/role.service"));
const permission_service_1 = __importDefault(require("../../app/dash/services/permission.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const roles_model_1 = __importDefault(require("../../db/models/roles.model"));
const user_log_1 = require("../../utils/dash/user-log");
const service = new role_service_1.default();
const servicePermission = new permission_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { ROLE_TABLE } = roles_model_1.default;
const getAllRoleByCustomerIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield service.findAllByCustomerId(Number(req.params.customerId));
        res.json(roles);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllRoleByCustomerIdController = getAllRoleByCustomerIdController;
const getRoleByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const roleModel = yield service.findOne(id);
        const { dataValues } = roleModel;
        const permissions = yield servicePermission.findAllByRoleId(Number(id));
        const permissionsIds = permissions.map((item) => item.id);
        res.json(Object.assign(Object.assign({}, dataValues), { permissions: permissionsIds }));
    }
    catch (error) {
        next(error);
    }
});
exports.getRoleByIdController = getRoleByIdController;
const createRoleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newRole = yield service.create(body, body.permissions);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            newData: newRole.dataValues,
            id: newRole.dataValues.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P11-01",
            entity: ROLE_TABLE,
            entityId: Number(newRole.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
            methodSumary: sumary,
        });
        res.status(201).json(newRole);
    }
    catch (error) {
        next(error);
    }
});
exports.createRoleController = createRoleController;
const updateRoleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g, _h, _j;
    try {
        const { id } = req.params;
        const body = req.body;
        const { oldRole, newRole, permissionsToDelete, permissionsToAdd, permissionWithoutChanges } = yield service.update(id, body, body.permissions);
        console.log(oldRole);
        console.log(newRole);
        console.log(permissionsToDelete);
        console.log(permissionsToAdd);
        console.log(permissionWithoutChanges);
        const permissionsRolSumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            oldData: permissionsToDelete !== null && permissionsToDelete !== void 0 ? permissionsToDelete : [],
            newData: permissionsToAdd !== null && permissionsToAdd !== void 0 ? permissionsToAdd : [],
            withoutChanges: permissionWithoutChanges !== null && permissionWithoutChanges !== void 0 ? permissionWithoutChanges : [],
            name: ROLE_TABLE,
            id: newRole.dataValues.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P11-02",
            entity: ROLE_TABLE,
            entityId: Number(newRole.dataValues.id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
            methodSumary: permissionsRolSumary,
        });
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            oldData: oldRole,
            newData: newRole.dataValues,
            id: newRole.dataValues.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P11-02",
            entity: ROLE_TABLE,
            entityId: Number(newRole.dataValues.id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
            methodSumary: sumary,
        });
        res.json(newRole);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRoleController = updateRoleController;
const deleteRoleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m;
    try {
        const { id } = req.params;
        const oldRole = yield service.delete(id);
        const sumary = (0, user_log_1.generateLogSummary)({
            method: req.method,
            oldData: oldRole,
            id: oldRole.id,
        });
        yield serviceUserLog.create({
            customerUserId: Number((_k = req.user) === null || _k === void 0 ? void 0 : _k.id),
            codeAction: "P11-03",
            entity: ROLE_TABLE,
            entityId: Number(id),
            ip: (_l = req.clientIp) !== null && _l !== void 0 ? _l : "",
            customerId: Number((_m = req.user) === null || _m === void 0 ? void 0 : _m.customerId),
            methodSumary: sumary,
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRoleController = deleteRoleController;

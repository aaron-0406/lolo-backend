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
const service = new role_service_1.default();
const getAllRoleByCustomerIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield service.findAllByCustomerId(Number(req.query.customerId));
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
        const role = yield service.findOne(id);
        res.json(role);
    }
    catch (error) {
        next(error);
    }
});
exports.getRoleByIdController = getRoleByIdController;
const createRoleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newRole = yield service.create(body, body.permissions);
        res.status(201).json(newRole);
    }
    catch (error) {
        next(error);
    }
});
exports.createRoleController = createRoleController;
const updateRoleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const role = yield service.update(id, body, body.permissions);
        res.json(role);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRoleController = updateRoleController;
const deleteRoleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRoleController = deleteRoleController;

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
exports.deletePermissionController = exports.updatePermissionController = exports.createPermissionController = exports.getPermissionByIdController = exports.getAllPermissionController = void 0;
const permission_service_1 = __importDefault(require("../../app/dash/services/permission.service"));
const helpers_1 = require("../../libs/helpers");
const service = new permission_service_1.default();
const getAllPermissionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code } = req.query;
        const permissions = yield service.findAll(code ? String(code) : undefined);
        const tree = (0, helpers_1.buildTree)(permissions, code ? String(code).length : 3);
        if (code) {
            res.json(tree[0].permissions);
        }
        else {
            res.json(tree);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPermissionController = getAllPermissionController;
const getPermissionByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const permission = yield service.findOne(id);
        res.json(permission);
    }
    catch (error) {
        next(error);
    }
});
exports.getPermissionByIdController = getPermissionByIdController;
const createPermissionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newPermission = yield service.create(body);
        res.status(201).json(newPermission);
    }
    catch (error) {
        next(error);
    }
});
exports.createPermissionController = createPermissionController;
const updatePermissionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const permission = yield service.update(id, body);
        res.json(permission);
    }
    catch (error) {
        next(error);
    }
});
exports.updatePermissionController = updatePermissionController;
const deletePermissionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePermissionController = deletePermissionController;

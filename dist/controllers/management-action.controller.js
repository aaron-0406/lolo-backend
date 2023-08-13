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
const management_action_service_1 = __importDefault(require("../app/boss/services/management-action.service"));
const service = new management_action_service_1.default();
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
    try {
        const body = req.body;
        const newManagementAction = yield service.create(body);
        res.status(201).json(newManagementAction);
    }
    catch (error) {
        next(error);
    }
});
exports.createManagementActionController = createManagementActionController;
const updateManagementActionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const managementAction = yield service.update(id, body);
        res.json(managementAction);
    }
    catch (error) {
        next(error);
    }
});
exports.updateManagementActionController = updateManagementActionController;
const deleteManagementActionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteManagementActionController = deleteManagementActionController;

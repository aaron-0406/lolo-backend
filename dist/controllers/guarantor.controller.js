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
exports.deleteGuarantorController = exports.updateGuarantorController = exports.createGuarantorController = exports.getGuarantorByIdController = exports.getGuarantorByClientIdController = exports.getGuarantorController = void 0;
const guarantor_service_1 = __importDefault(require("../app/extrajudicial/services/guarantor.service"));
const service = new guarantor_service_1.default();
const getGuarantorController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guarantors = yield service.findAll();
        res.json(guarantors);
    }
    catch (error) {
        next(error);
    }
});
exports.getGuarantorController = getGuarantorController;
const getGuarantorByClientIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const guarantors = yield service.findAllByClient(clientId);
        res.json(guarantors);
    }
    catch (error) {
        next(error);
    }
});
exports.getGuarantorByClientIdController = getGuarantorByClientIdController;
const getGuarantorByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const guarantor = yield service.findByID(id);
        res.json(guarantor);
    }
    catch (error) {
        next(error);
    }
});
exports.getGuarantorByIdController = getGuarantorByIdController;
const createGuarantorController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newGuarantor = yield service.create(body);
        res.status(201).json(newGuarantor);
    }
    catch (error) {
        next(error);
    }
});
exports.createGuarantorController = createGuarantorController;
const updateGuarantorController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const guarantor = yield service.update(id, body);
        res.json(guarantor);
    }
    catch (error) {
        next(error);
    }
});
exports.updateGuarantorController = updateGuarantorController;
const deleteGuarantorController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteGuarantorController = deleteGuarantorController;

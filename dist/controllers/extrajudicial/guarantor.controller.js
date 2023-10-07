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
const guarantor_service_1 = __importDefault(require("../../app/extrajudicial/services/guarantor.service"));
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const guarantor_model_1 = __importDefault(require("../../db/models/guarantor.model"));
const service = new guarantor_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { GUARANTOR_TABLE } = guarantor_model_1.default;
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
    var _a, _b;
    try {
        const body = req.body;
        const newGuarantor = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P03-07-01",
            entity: GUARANTOR_TABLE,
            entityId: Number(newGuarantor.dataValues.id),
            ip: req.ip,
            customerId: Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.customerId),
        });
        res.status(201).json(newGuarantor);
    }
    catch (error) {
        next(error);
    }
});
exports.createGuarantorController = createGuarantorController;
const updateGuarantorController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { id } = req.params;
        const body = req.body;
        const guarantor = yield service.update(id, body);
        yield serviceUserLog.create({
            customerUserId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.id),
            codeAction: "P03-07-02",
            entity: GUARANTOR_TABLE,
            entityId: Number(guarantor.dataValues.id),
            ip: req.ip,
            customerId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.customerId),
        });
        res.json(guarantor);
    }
    catch (error) {
        next(error);
    }
});
exports.updateGuarantorController = updateGuarantorController;
const deleteGuarantorController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const { id } = req.params;
        yield service.delete(id);
        yield serviceUserLog.create({
            customerUserId: Number((_e = req.user) === null || _e === void 0 ? void 0 : _e.id),
            codeAction: "P03-07-03",
            entity: GUARANTOR_TABLE,
            entityId: Number(id),
            ip: req.ip,
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteGuarantorController = deleteGuarantorController;

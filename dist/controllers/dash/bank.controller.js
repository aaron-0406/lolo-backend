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
exports.deleteBankController = exports.updateBankController = exports.createBankController = exports.getBankByIdController = exports.getBanksController = void 0;
const bank_service_1 = __importDefault(require("../../app/dash/services/bank.service"));
const service = new bank_service_1.default();
const getBanksController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const banks = yield service.findAll();
        res.json(banks);
    }
    catch (error) {
        next(error);
    }
});
exports.getBanksController = getBanksController;
const getBankByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const bank = yield service.findOne(id);
        res.json(bank);
    }
    catch (error) {
        next(error);
    }
});
exports.getBankByIdController = getBankByIdController;
const createBankController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newBank = yield service.create(body);
        res.status(201).json(newBank);
    }
    catch (error) {
        next(error);
    }
});
exports.createBankController = createBankController;
const updateBankController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const bank = yield service.update(id, body);
        res.json(bank);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBankController = updateBankController;
const deleteBankController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBankController = deleteBankController;

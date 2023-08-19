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
exports.deleteCustomerHasBankController = exports.createCustomerHasBankController = exports.getCustomerHasBankByIdController = exports.getCustomerHasBankController = void 0;
const customer_has_bank_service_1 = __importDefault(require("../../app/dash/services/customer-has-bank.service"));
const service = new customer_has_bank_service_1.default();
const getCustomerHasBankController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customersBanks = yield service.findAll();
        res.json(customersBanks);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerHasBankController = getCustomerHasBankController;
const getCustomerHasBankByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCustomer, idBank } = req.params;
        const customerBank = yield service.findOne(idCustomer, idBank);
        res.json(customerBank);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerHasBankByIdController = getCustomerHasBankByIdController;
const createCustomerHasBankController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newCustomerBank = yield service.assign(body);
        res.status(201).json(newCustomerBank);
    }
    catch (error) {
        next(error);
    }
});
exports.createCustomerHasBankController = createCustomerHasBankController;
const deleteCustomerHasBankController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCustomer, idBank } = req.params;
        yield service.delete(idCustomer, idBank);
        res.status(201).json({ idCustomer, idBank });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCustomerHasBankController = deleteCustomerHasBankController;

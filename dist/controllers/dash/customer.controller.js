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
exports.updateCustomerController = exports.updateCustomerScrapperStateController = exports.updateCustomerStateController = exports.createCustomerController = exports.getCustomerByUrlIdentifierController = exports.getAllCustomersController = void 0;
const customer_service_1 = __importDefault(require("../../app/dash/services/customer.service"));
const service = new customer_service_1.default();
const getAllCustomersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield service.find();
        res.json(customers);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCustomersController = getAllCustomersController;
const getCustomerByUrlIdentifierController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { urlIdentifier } = req.params;
        const customer = yield service.findOne(urlIdentifier);
        res.json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerByUrlIdentifierController = getCustomerByUrlIdentifierController;
const createCustomerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newCustomer = yield service.create(body);
        res.status(201).json(newCustomer);
    }
    catch (error) {
        next(error);
    }
});
exports.createCustomerController = createCustomerController;
const updateCustomerStateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const customer = yield service.updateState(id, body.state);
        res.json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCustomerStateController = updateCustomerStateController;
const updateCustomerScrapperStateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const customer = yield service.updateScreapperState(id, body.state);
        res.json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCustomerScrapperStateController = updateCustomerScrapperStateController;
const updateCustomerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const customer = yield service.update(id, body);
        res.json(customer);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCustomerController = updateCustomerController;

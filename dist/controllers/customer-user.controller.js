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
exports.deleteCustomerUserController = exports.updateCustomerUserController = exports.updateCustomerUserStateController = exports.createCustomerUserController = exports.getCustomerUserByIdController = exports.getCustomerUserByCustomerIdController = exports.getCustomerUsersController = void 0;
const customer_user_service_1 = __importDefault(require("../app/customers/services/customer-user.service"));
const service = new customer_user_service_1.default();
const getCustomerUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customersBanks = yield service.findAll();
        res.json(customersBanks);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerUsersController = getCustomerUsersController;
const getCustomerUserByCustomerIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const users = yield service.findAllByCustomerID(customerId);
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerUserByCustomerIdController = getCustomerUserByCustomerIdController;
const getCustomerUserByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield service.findOne(id);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getCustomerUserByIdController = getCustomerUserByIdController;
const createCustomerUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newUser = yield service.create(body);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.createCustomerUserController = createCustomerUserController;
const updateCustomerUserStateController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = yield service.updateState(id, body);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCustomerUserStateController = updateCustomerUserStateController;
const updateCustomerUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const user = yield service.update(id, body);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCustomerUserController = updateCustomerUserController;
const deleteCustomerUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCustomerUserController = deleteCustomerUserController;

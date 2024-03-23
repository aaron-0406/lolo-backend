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
exports.updateUserAppController = exports.createUserAppController = exports.getUserAppByIdController = exports.getAllUserAppController = void 0;
const user_app_service_1 = __importDefault(require("../../app/dash/services/user-app.service"));
const service = new user_app_service_1.default();
const getAllUserAppController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield service.findAll();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUserAppController = getAllUserAppController;
const getUserAppByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield service.findOne(id);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserAppByIdController = getUserAppByIdController;
const createUserAppController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newUser = yield service.create(body);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.createUserAppController = createUserAppController;
const updateUserAppController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.updateUserAppController = updateUserAppController;

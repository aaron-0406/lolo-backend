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
exports.deletedRegisterOfficeController = exports.updateRegisterOfficeController = exports.createRegisterOfficeController = exports.findAllRegisterOfficesByCHBController = exports.findAllRegisterOfficesController = void 0;
const judicial_register_office_service_1 = __importDefault(require("../../app/judicial/services/judicial-register-office.service"));
const service = new judicial_register_office_service_1.default();
const findAllRegisterOfficesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerOffices = yield service.findAll();
        res.json(registerOffices);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllRegisterOfficesController = findAllRegisterOfficesController;
const findAllRegisterOfficesByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const registerOffices = yield service.findAllByCHB(parseInt(chb));
        res.json(registerOffices);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllRegisterOfficesByCHBController = findAllRegisterOfficesByCHBController;
const createRegisterOfficeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newRegisterOffice = yield service.create(body);
        res.json(newRegisterOffice);
    }
    catch (error) {
        next(error);
    }
});
exports.createRegisterOfficeController = createRegisterOfficeController;
const updateRegisterOfficeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const registerOffice = yield service.update(id, body);
        res.json(registerOffice);
    }
    catch (error) {
        next(error);
    }
});
exports.updateRegisterOfficeController = updateRegisterOfficeController;
const deletedRegisterOfficeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const registerOffice = yield service.delete(id);
        res.json(registerOffice);
    }
    catch (error) {
        next(error);
    }
});
exports.deletedRegisterOfficeController = deletedRegisterOfficeController;

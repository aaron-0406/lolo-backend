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
exports.deletedNotaryController = exports.updateNotaryController = exports.createNotaryController = exports.findAllNotariesByCHBController = exports.findAllNotariesController = void 0;
const judicial_notary_service_1 = __importDefault(require("../../app/judicial/services/judicial-notary.service"));
const service = new judicial_notary_service_1.default();
const findAllNotariesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notaries = yield service.findAll();
        res.json(notaries);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllNotariesController = findAllNotariesController;
const findAllNotariesByCHBController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb } = req.params;
        const notaries = yield service.findAllByCHB(parseInt(chb));
        res.json(notaries);
    }
    catch (error) {
        next(error);
    }
});
exports.findAllNotariesByCHBController = findAllNotariesByCHBController;
const createNotaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newNotary = yield service.create(body);
        res.json(newNotary);
    }
    catch (error) {
        next(error);
    }
});
exports.createNotaryController = createNotaryController;
const updateNotaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const notary = yield service.update(id, body);
        res.json(notary);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNotaryController = updateNotaryController;
const deletedNotaryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const notary = yield service.delete(id);
        res.json(notary);
    }
    catch (error) {
        next(error);
    }
});
exports.deletedNotaryController = deletedNotaryController;

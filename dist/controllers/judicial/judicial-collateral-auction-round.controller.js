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
exports.deleteJudicialCollateralAuctionRoundController = exports.updateJudicialCollateralAuctionRoundController = exports.createJudicialCollateralAuctionRoundController = exports.getJudicialCollateralAuctionRoundById = exports.getAllJudicialCollateralAuctionRoundController = void 0;
const user_log_service_1 = __importDefault(require("../../app/dash/services/user-log.service"));
const judicial_collateral_auction_round_service_1 = __importDefault(require("../../app/judicial/services/judicial-collateral-auction-round.service"));
const judicial_collateral_auction_round_model_1 = __importDefault(require("../../db/models/judicial-collateral-auction-round.model"));
const service = new judicial_collateral_auction_round_service_1.default();
const serviceUserLog = new user_log_service_1.default();
const { JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE } = judicial_collateral_auction_round_model_1.default;
const getAllJudicialCollateralAuctionRoundController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collateralId, chb } = req.params;
        const collateralAuctionRounds = yield service.findAllAuctionbyCollateralId(Number(collateralId), Number(chb), req.query);
        res.json(collateralAuctionRounds);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllJudicialCollateralAuctionRoundController = getAllJudicialCollateralAuctionRoundController;
const getJudicialCollateralAuctionRoundById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chb, collateralId, id } = req.params;
        const collateralAuctionRound = yield service.getAuctionById(Number(chb), Number(collateralId), Number(id));
        res.json(collateralAuctionRound);
    }
    catch (error) {
        next(error);
    }
});
exports.getJudicialCollateralAuctionRoundById = getJudicialCollateralAuctionRoundById;
const createJudicialCollateralAuctionRoundController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const body = req.body;
        const newJudicialCollateralAuctionRound = yield service.create(body);
        yield serviceUserLog.create({
            customerUserId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id),
            codeAction: "P13-01-06-01-04-01",
            entity: JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
            entityId: Number(newJudicialCollateralAuctionRound === null || newJudicialCollateralAuctionRound === void 0 ? void 0 : newJudicialCollateralAuctionRound.dataValues.id),
            ip: (_b = req.clientIp) !== null && _b !== void 0 ? _b : "",
            customerId: Number((_c = req.user) === null || _c === void 0 ? void 0 : _c.customerId),
        });
        res.status(201).json(newJudicialCollateralAuctionRound);
    }
    catch (error) {
        next(error);
    }
});
exports.createJudicialCollateralAuctionRoundController = createJudicialCollateralAuctionRoundController;
const updateJudicialCollateralAuctionRoundController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f;
    try {
        const { chb, collateralId, id } = req.params;
        const body = req.body;
        const judicialCollateralAuctionRound = yield service.update(Number(chb), Number(collateralId), Number(id), body);
        yield serviceUserLog.create({
            customerUserId: Number((_d = req.user) === null || _d === void 0 ? void 0 : _d.id),
            codeAction: "P13-01-06-01-04-02",
            entity: JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
            entityId: Number(id),
            ip: (_e = req.clientIp) !== null && _e !== void 0 ? _e : "",
            customerId: Number((_f = req.user) === null || _f === void 0 ? void 0 : _f.customerId),
        });
        res.json(judicialCollateralAuctionRound);
    }
    catch (error) {
        next(error);
    }
});
exports.updateJudicialCollateralAuctionRoundController = updateJudicialCollateralAuctionRoundController;
const deleteJudicialCollateralAuctionRoundController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j;
    try {
        const { chb, collateralId, id } = req.params;
        const judicialCollateralAuctionRound = yield service.delete(Number(chb), Number(collateralId), Number(id));
        yield serviceUserLog.create({
            customerUserId: Number((_g = req.user) === null || _g === void 0 ? void 0 : _g.id),
            codeAction: "P13-01-06-01-04-03",
            entity: JUDICIAL_COLLATERAL_AUCTION_ROUND_TABLE,
            entityId: Number(id),
            ip: (_h = req.clientIp) !== null && _h !== void 0 ? _h : "",
            customerId: Number((_j = req.user) === null || _j === void 0 ? void 0 : _j.customerId),
        });
        res.status(201).json(judicialCollateralAuctionRound);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteJudicialCollateralAuctionRoundController = deleteJudicialCollateralAuctionRoundController;

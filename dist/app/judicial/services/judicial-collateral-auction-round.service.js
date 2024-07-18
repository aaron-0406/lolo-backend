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
const sequelize_1 = __importDefault(require("../../../libs/sequelize"));
const boom_1 = __importDefault(require("@hapi/boom"));
const { models } = sequelize_1.default;
class JudicialCollateralAuctionRoundService {
    constructor() { }
    findAllAuctionbyCollateralId(collateralId, chb, query) {
        return __awaiter(this, void 0, void 0, function* () {
            let filtersWhere = {
                judicialCollateralIdJudicialCollateral: collateralId,
                customerHasBankId: chb,
            };
            try {
                const judicialCollateralAuctionRounds = yield models.JUDICIAL_COLLATERAL_AUCTION_ROUND.findAll({
                    where: filtersWhere,
                    attributes: {
                        exclude: ["judicialCollateralId"]
                    }
                });
                if (!judicialCollateralAuctionRounds) {
                    throw boom_1.default.notFound("No se encontraron rondas de remate");
                }
                return judicialCollateralAuctionRounds;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findAllAuctionbyCaseFileId(caseFileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rta = yield models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll({
                    where: {
                        judicialCaseFileId: caseFileId,
                    },
                    include: [
                        {
                            model: models.JUDICIAL_COLLATERAL,
                            as: "judicialCollateral",
                            where: {
                                deletedAt: null,
                            },
                            include: [
                                {
                                    model: models.JUDICIAL_COLLATERAL_AUCTION_ROUND,
                                    as: "judicialCollateralAuctionRound",
                                    where: {
                                        deletedAt: null,
                                    },
                                    attributes: {
                                        exclude: ["judicialCollateralId"]
                                    }
                                }
                            ]
                        }
                    ]
                });
                const judicialCollateralAuctionRounds = rta.flatMap((item) => item.dataValues.judicialCollateral.dataValues.judicialCollateralAuctionRound);
                if (!judicialCollateralAuctionRounds || judicialCollateralAuctionRounds.length === 0) {
                    throw boom_1.default.notFound("No se encontraron rondas de remate");
                }
                return judicialCollateralAuctionRounds;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAuctionById(chb, collateralId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const judicialCollateralAuctionRound = yield models.JUDICIAL_COLLATERAL_AUCTION_ROUND.findOne({
                    where: {
                        id,
                        customerHasBankId: chb,
                        judicialCollateralIdJudicialCollateral: collateralId,
                    },
                    attributes: {
                        exclude: ["judicialCollateralId"]
                    }
                });
                if (!judicialCollateralAuctionRound)
                    throw boom_1.default.notFound("Ronda de remate no encontrada");
                return judicialCollateralAuctionRound;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newJudicialCollateralAuctionRound = yield models.JUDICIAL_COLLATERAL_AUCTION_ROUND.create(data);
                return newJudicialCollateralAuctionRound;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update(chb, collateralId, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const judicialCollateralAuctionRound = yield models.JUDICIAL_COLLATERAL_AUCTION_ROUND.findOne({
                    where: {
                        id,
                        customerHasBankId: chb,
                        judicialCollateralIdJudicialCollateral: collateralId,
                    },
                    attributes: {
                        exclude: ["judicialCollateralId"]
                    }
                });
                if (!judicialCollateralAuctionRound) {
                    throw boom_1.default.notFound("Ronda de remate no encontrada");
                }
                const oldData = Object.assign({}, judicialCollateralAuctionRound === null || judicialCollateralAuctionRound === void 0 ? void 0 : judicialCollateralAuctionRound.get());
                const newData = yield judicialCollateralAuctionRound.update(data);
                return { oldData, newData };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    delete(chb, collateralId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const judicialCollateralAuctionRound = yield models.JUDICIAL_COLLATERAL_AUCTION_ROUND.findOne({
                    where: {
                        id,
                        customerHasBankId: chb,
                        judicialCollateralIdJudicialCollateral: collateralId,
                    },
                    attributes: {
                        exclude: ["judicialCollateralId"]
                    }
                });
                const oldData = Object.assign({}, judicialCollateralAuctionRound === null || judicialCollateralAuctionRound === void 0 ? void 0 : judicialCollateralAuctionRound.get());
                if (!judicialCollateralAuctionRound)
                    throw boom_1.default.notFound("Ronda de remate no encontrada");
                yield judicialCollateralAuctionRound.destroy();
                return oldData;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = JudicialCollateralAuctionRoundService;

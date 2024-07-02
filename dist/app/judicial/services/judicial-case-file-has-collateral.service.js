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
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../libs/sequelize"));
const boom_1 = __importDefault(require("@hapi/boom"));
const { models } = sequelize_2.default;
class JudicialCaseFileHasCollateralService {
    constructor() { }
    findAllRelatedCaseFileAssingCollateral(numberCaseFile, collateralId, chb) {
        return __awaiter(this, void 0, void 0, function* () {
            const codes = numberCaseFile.split("-");
            codes[2] = "%";
            const filterNumberCaseFile = codes.join("-");
            const judicialCaseFile = yield models.JUDICIAL_CASE_FILE.findAll({
                include: {
                    model: models.CLIENT,
                    as: "client",
                    attributes: ["id", "name"],
                },
                where: {
                    numberCaseFile: {
                        [sequelize_1.Op.like]: filterNumberCaseFile,
                    },
                    customer_has_bank_id: chb,
                },
            });
            const judicialCollaterals = yield models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll({
                where: {
                    judicialCollateralId: collateralId,
                },
            });
            if (!judicialCaseFile) {
                throw boom_1.default.notFound("Expediente no encontrado");
            }
            const currentCaseFileHasCollaterals = judicialCollaterals.map((collateral) => collateral.dataValues);
            const judicialCaseFiles = judicialCaseFile.map((judicialCaseFile) => judicialCaseFile.dataValues);
            const judicialCaseFilesWithCollateral = judicialCaseFiles.map((judicialCaseFile) => {
                const collateral = currentCaseFileHasCollaterals.some((currentCaseFileHasCollateral) => currentCaseFileHasCollateral.judicialCaseFileId ===
                    judicialCaseFile.id);
                if (collateral) {
                    return Object.assign(Object.assign({}, judicialCaseFile), { hasCollateral: true });
                }
                return Object.assign(Object.assign({}, judicialCaseFile), { hasCollateral: false });
            });
            return judicialCaseFilesWithCollateral;
        });
    }
    assingCollateralToCaseFile(data, collateralId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.length) {
                throw boom_1.default.badRequest("La garantía debe estar asignada al menos a un expediente");
            }
            const judicialCollaterals = yield models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.findAll({
                where: {
                    judicialCollateralId: collateralId,
                    deletedAt: null,
                },
            });
            const currentJudicialCaseFileHasCollaterals = judicialCollaterals.map((judicialCollateral) => judicialCollateral.dataValues);
            // JudicialCaseFilesHasCollaterals
            const JudicialCaseFileHasCollateralsToDelete = currentJudicialCaseFileHasCollaterals.filter((currentCollateral) => !data.some((collateral) => collateral.judicialCaseFileId ===
                currentCollateral.judicialCaseFileId));
            const JudicialCaseFileHasCollateralsToCreate = data.filter((collateral) => !currentJudicialCaseFileHasCollaterals.some((currentCollateral) => currentCollateral.judicialCaseFileId ===
                collateral.judicialCaseFileId));
            try {
                for (const collateral of JudicialCaseFileHasCollateralsToDelete) {
                    yield models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.destroy({
                        where: {
                            judicialCaseFileId: collateral.judicialCaseFileId,
                            judicialCollateralId: collateralId,
                        },
                    });
                }
                for (const newCollateral of JudicialCaseFileHasCollateralsToCreate) {
                    yield models.JUDICIAL_CASE_FILE_HAS_COLLATERAL.create(newCollateral);
                }
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = JudicialCaseFileHasCollateralService;

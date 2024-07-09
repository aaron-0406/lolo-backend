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
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../../../config/config"));
const aws_bucket_1 = require("../../../libs/aws_bucket");
const helpers_1 = require("../../../libs/helpers");
const sequelize_1 = __importDefault(require("../../../libs/sequelize"));
const boom_1 = __importDefault(require("@hapi/boom"));
const { models } = sequelize_1.default;
class JudicialCollateralFilesService {
    constructor() { }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialCollateralFile = yield models.JUDICIAL_COLLATERAL_FILE.findOne({
                where: {
                    id,
                },
            });
            if (!judicialCollateralFile) {
                throw boom_1.default.notFound("Archivo de garantía no encontrado");
            }
            return judicialCollateralFile;
        });
    }
    findOne(chb, collateralId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield models.JUDICIAL_COLLATERAL_FILES.findOne({
                    where: {
                        id,
                    },
                    attributes: {
                        exclude: ["judicialCollateralId"],
                    },
                });
                if (!file) {
                    throw boom_1.default.notFound("Archivo no encontrado");
                }
                const isStored = (0, helpers_1.isFileStoredIn)(path_1.default.join(__dirname, "../../../public/download"), file.dataValues.name);
                if (!isStored) {
                    yield (0, aws_bucket_1.readFile)(`${config_1.default.AWS_CHB_PATH}${chb}/collaterals/${collateralId}/${file.dataValues.nameOriginAws}`);
                }
                return file;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findAllByCollateralId(collateralId, chb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const judicialCollateralFile = yield models.JUDICIAL_COLLATERAL_FILES.findAll({
                    where: {
                        judicialCollateralIdJudicialCollateral: collateralId,
                        customerHasBankId: chb,
                    },
                    attributes: {
                        exclude: ["judicialCollateralId"],
                    },
                });
                if (!judicialCollateralFile) {
                    throw boom_1.default.notFound("Collateral file no encontrado");
                }
                return judicialCollateralFile;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(files, chb, collateralId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filesData = yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                    const newJudicialCollateralFile = yield models.JUDICIAL_COLLATERAL_FILES.create({
                        originalName: file.originalname,
                        nameOriginAws: "",
                        judicialCollateralIdJudicialCollateral: collateralId,
                        customerHasBankId: chb,
                    });
                    const date = new Date();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    const nameOriginAws = `${collateralId}-${month}-${year}-${file.originalname}`;
                    yield (0, helpers_1.renameFile)(`../public/docs/`, file.filename, nameOriginAws);
                    file.filename = nameOriginAws;
                    yield (0, aws_bucket_1.uploadFile)(file, `${config_1.default.AWS_CHB_PATH}${chb}/collaterals/${collateralId}`);
                    // UPDATE NAME IN DATABASE
                    const updatedJudicialCollateralFile = yield newJudicialCollateralFile.update({
                        nameOriginAws: file.filename,
                    });
                    // DELETE TEMP FILE
                    yield (0, helpers_1.deleteFile)("../public/docs", file.filename);
                    return updatedJudicialCollateralFile;
                })));
                return filesData;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    delete(id, chb, collateralId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const judicialCollateralFile = yield models.JUDICIAL_COLLATERAL_FILES.findOne({
                    where: {
                        id,
                    },
                    attributes: {
                        exclude: ["judicialCollateralId"],
                    },
                });
                if (!judicialCollateralFile)
                    throw boom_1.default.notFound("Archivo no encontrado");
                yield judicialCollateralFile.destroy();
                yield (0, aws_bucket_1.deleteFileBucket)(`${config_1.default.AWS_CHB_PATH}${chb}/collaterals/${collateralId}/${judicialCollateralFile.dataValues.nameOriginAws}`);
                return { id };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = JudicialCollateralFilesService;

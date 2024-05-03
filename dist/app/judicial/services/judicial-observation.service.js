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
const config_1 = __importDefault(require("../../../config/config"));
const boom_1 = __importDefault(require("@hapi/boom"));
const helpers_1 = require("../../../libs/helpers");
const aws_bucket_1 = require("../../../libs/aws_bucket");
const { models } = sequelize_1.default;
class JudicialObservationService {
    constructor() { }
    findAllByCHBAndFileCase(fileCase) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("3");
            const rta = yield models.JUDICIAL_OBSERVATION.findAll({
                include: [
                    {
                        model: models.JUDICIAL_OBS_TYPE,
                        as: "judicialObsType",
                    },
                    {
                        model: models.JUDICIAL_OBS_FILE,
                        as: "judicialObsFile",
                    },
                ],
                where: {
                    judicialFileCaseId: fileCase,
                },
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObservation = yield models.JUDICIAL_OBSERVATION.findOne({
                include: [
                    {
                        model: models.JUDICIAL_OBS_TYPE,
                        as: "judicialObsType",
                    },
                    {
                        model: models.JUDICIAL_OBS_FILE,
                        as: "judicialObsFile",
                    },
                ],
                where: {
                    id,
                },
            });
            if (!judicialObservation) {
                throw boom_1.default.notFound("Observación Judicial no encontrada");
            }
            return judicialObservation;
        });
    }
    create(data, files, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialObservation = yield models.JUDICIAL_OBSERVATION.create(data);
            files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                const newObsFile = yield models.JUDICIAL_OBS_FILE.create({
                    judicial_observation_id_judicial_observation: newJudicialObservation.dataValues.id,
                    original_name: file.originalname,
                    aws_name: "",
                    customer_has_bank_id_customer_has_bank: data.customerHasBankId,
                });
                const fecha = new Date();
                const mes = fecha.getMonth() + 1;
                const año = fecha.getFullYear();
                const newFileName = `${newObsFile.dataValues.id}-${file.originalname}-${mes}-${año}`;
                yield (0, helpers_1.renameFile)(`../public/docs/`, file.filename, newFileName);
                file.filename = newFileName;
                // UPLOAD TO AWS
                yield (0, aws_bucket_1.uploadFile)(file, `${config_1.default.AWS_CHB_PATH}${params.idCustomer}/${data.customerHasBankId}/${params.code}/case-file/${data.judicialCaseFileId}/observation`);
                // UPDATE NAME IN DATABASE
                newObsFile.update({
                    aws_name: file.filename,
                });
                // DELETE TEMP FILE
                yield (0, helpers_1.deleteFile)("../public/docs", file.filename);
            }));
            const observation = yield this.findByID(newJudicialObservation.dataValues.id);
            return observation;
        });
    }
    update(id, changes, files, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObservation = yield this.findByID(id);
            yield judicialObservation.update(changes);
            files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                const newObsFile = yield models.JUDICIAL_OBS_FILE.create({
                    judicial_observation_id_judicial_observation: id,
                    original_name: file.originalname,
                    aws_name: "",
                    customer_has_bank_id_customer_has_bank: judicialObservation.dataValues.customerHasBankId,
                });
                const fecha = new Date();
                const mes = fecha.getMonth() + 1;
                const año = fecha.getFullYear();
                const newFileName = `${newObsFile.dataValues.id}-${file.filename}-${mes}-${año}`;
                yield (0, helpers_1.renameFile)(`../public/docs/`, file.filename, newFileName);
                file.filename = newFileName;
                // UPLOAD TO AWS
                yield (0, aws_bucket_1.uploadFile)(file, `${config_1.default.AWS_CHB_PATH}${params.idCustomer}/${judicialObservation.dataValues.customerHasBankId}/${params.code}/case-file/${judicialObservation.dataValues.judicialFileCaseId}/observation`);
                // UPDATE NAME IN DATABASE
                newObsFile.update({
                    aws_name: file.filename,
                });
                // DELETE TEMP FILE
                yield (0, helpers_1.deleteFile)("../public/docs", file.filename);
            }));
            const newJudicialObservation = yield this.findByID(id);
            return newJudicialObservation;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObservation = yield this.findByID(id);
            yield judicialObservation.destroy();
            return { id };
        });
    }
}
exports.default = JudicialObservationService;

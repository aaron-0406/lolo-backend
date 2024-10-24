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
                order: [["id", "DESC"]],
                where: {
                    judicial_case_file_id_judicial_case_file: fileCase,
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
            const fileCreationPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const newObsFile = yield models.JUDICIAL_OBS_FILE.create({
                    judicialObservationId: newJudicialObservation.dataValues.id,
                    originalName: file.originalname,
                    awsName: "",
                    customerHasBankId: data.customerHasBankId,
                });
                const fecha = new Date();
                const mes = fecha.getMonth() + 1;
                const año = fecha.getFullYear();
                const newFileName = `${newObsFile.dataValues.id}-${mes}-${año}-${file.originalname}`;
                yield (0, helpers_1.renameFile)(`../public/docs/`, file.filename, newFileName);
                file.filename = newFileName;
                // UPLOAD TO AWS
                yield (0, aws_bucket_1.uploadFile)(file, `${config_1.default.AWS_CHB_PATH}${params.idCustomer}/${data.customerHasBankId}/${params.code}/case-file/${data.judicialCaseFileId}/observation`);
                // UPDATE NAME IN DATABASE
                newObsFile.update({
                    awsName: file.filename,
                });
                // DELETE TEMP FILE
                yield (0, helpers_1.deleteFile)("../public/docs", file.filename);
            }));
            yield Promise.all(fileCreationPromises);
            const observation = yield this.findByID(newJudicialObservation.dataValues.id);
            return observation;
        });
    }
    update(id, changes, files, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObservation = yield this.findByID(id);
            const oldJudicialObservation = Object.assign({}, judicialObservation.get());
            yield judicialObservation.update(changes);
            const fileCreationPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                const newObsFile = yield models.JUDICIAL_OBS_FILE.create({
                    judicialObservationId: id,
                    originalName: file.originalname,
                    awsName: "",
                    customerHasBankId: judicialObservation.dataValues.customerHasBankId,
                });
                const fecha = new Date();
                const mes = fecha.getMonth() + 1;
                const año = fecha.getFullYear();
                const newFileName = `${newObsFile.dataValues.id}-${mes}-${año}-${file.filename}`;
                yield (0, helpers_1.renameFile)(`../public/docs/`, file.filename, newFileName);
                file.filename = newFileName;
                // UPLOAD TO AWS
                yield (0, aws_bucket_1.uploadFile)(file, `${config_1.default.AWS_CHB_PATH}${params.idCustomer}/${judicialObservation.dataValues.customerHasBankId}/${params.code}/case-file/${judicialObservation.dataValues.judicialCaseFileId}/observation`);
                // UPDATE NAME IN DATABASE
                newObsFile.update({
                    awsName: file.filename,
                });
                // DELETE TEMP FILE
                yield (0, helpers_1.deleteFile)("../public/docs", file.filename);
            }));
            yield Promise.all(fileCreationPromises);
            const newJudicialObservation = yield this.findByID(judicialObservation.dataValues.id);
            return { oldJudicialObservation, newJudicialObservation };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialObservation = yield this.findByID(id);
            const oldJudicialObservation = Object.assign({}, judicialObservation.get());
            yield judicialObservation.destroy();
            return oldJudicialObservation;
        });
    }
}
exports.default = JudicialObservationService;

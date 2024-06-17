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
const config_1 = __importDefault(require("../../../config/config"));
const aws_bucket_1 = require("../../../libs/aws_bucket");
const helpers_1 = require("../../../libs/helpers");
const moment_1 = __importDefault(require("moment"));
const sequelize_2 = require("sequelize");
const { models } = sequelize_1.default;
class JudicialBinnacleService {
    constructor() { }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinnacle = yield models.JUDICIAL_BINNACLE.findAll({
                include: [
                    {
                        model: models.JUDICIAL_BIN_TYPE_BINNACLE,
                        as: "binnacleType",
                    },
                    {
                        model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
                        as: "judicialBinProceduralStage",
                    },
                    {
                        model: models.JUDICIAL_BIN_FILE,
                        as: "judicialBinFiles",
                    },
                ],
                order: [["id", "DESC"]],
            });
            return judicialBinnacle;
        });
    }
    findAllByCHBAndFileCase(fileCase, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sortBy, order } = query;
            let orderConfig = [];
            if (sortBy && order) {
                const sortByFields = sortBy.split(',');
                const orderDirections = order.split(',');
                orderConfig = sortByFields.map((field, index) => {
                    let sortField;
                    switch (field.trim()) {
                        case 'FECHA':
                            sortField = 'createdAt';
                            break;
                        default:
                            sortField = field.trim();
                    }
                    return [sortField, (orderDirections[index] || 'ASC').trim().toUpperCase()];
                });
            }
            const rta = yield models.JUDICIAL_BINNACLE.findAll({
                include: [
                    {
                        model: models.JUDICIAL_BIN_TYPE_BINNACLE,
                        as: "binnacleType",
                    },
                    {
                        model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
                        as: "judicialBinProceduralStage",
                    },
                    {
                        model: models.JUDICIAL_BIN_FILE,
                        as: "judicialBinFiles",
                    },
                ],
                order: orderConfig,
                where: {
                    judicialFileCaseId: fileCase,
                },
            });
            return rta;
        });
    }
    findByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinnacle = yield models.JUDICIAL_BINNACLE.findOne({
                include: [
                    {
                        model: models.JUDICIAL_BIN_TYPE_BINNACLE,
                        as: "binnacleType",
                    },
                    {
                        model: models.JUDICIAL_BIN_PROCEDURAL_STAGE,
                        as: "judicialBinProceduralStage",
                    },
                    {
                        model: models.JUDICIAL_BIN_FILE,
                        as: "judicialBinFiles",
                    },
                ],
                where: {
                    id,
                },
            });
            if (!judicialBinnacle) {
                throw boom_1.default.notFound("Bitacora Judicial no encontrada");
            }
            return judicialBinnacle;
        });
    }
    create(data, files, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJudicialBinnacle = yield models.JUDICIAL_BINNACLE.create(Object.assign({}, data));
            files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                const newBinFile = yield models.JUDICIAL_BIN_FILE.create({
                    judicialBinnacleId: newJudicialBinnacle.dataValues.id,
                    originalName: file.originalname,
                    nameOriginAws: "",
                    customerHasBankId: data.customerHasBankId,
                    size: file.size,
                });
                const newFileName = `${newBinFile.dataValues.id}-${file.filename}`;
                yield (0, helpers_1.renameFile)(`../public/docs/`, file.filename, newFileName);
                file.filename = newFileName;
                // UPLOAD TO AWS
                yield (0, aws_bucket_1.uploadFile)(file, `${config_1.default.AWS_CHB_PATH}${params.idCustomer}/${data.customerHasBankId}/${params.code}/case-file/${data.judicialFileCaseId}/binnacle`);
                // UPDATE NAME IN DATABASE
                newBinFile.update({
                    nameOriginAws: file.filename,
                });
                // DELETE TEMP FILE
                yield (0, helpers_1.deleteFile)("../public/docs", file.filename);
            }));
            const binnacle = yield this.findByID(newJudicialBinnacle.dataValues.id);
            return binnacle;
        });
    }
    update(id, changes, files, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinnacle = yield this.findByID(id);
            yield judicialBinnacle.update(changes);
            files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                const newBinFile = yield models.JUDICIAL_BIN_FILE.create({
                    judicialBinnacleId: id,
                    originalName: file.originalname,
                    nameOriginAws: "",
                    customerHasBankId: judicialBinnacle.dataValues.customerHasBankId,
                    size: file.size,
                });
                const newFileName = `${newBinFile.dataValues.id}-${file.filename}`;
                yield (0, helpers_1.renameFile)(`../public/docs/`, file.filename, newFileName);
                file.filename = newFileName;
                // UPLOAD TO AWS
                yield (0, aws_bucket_1.uploadFile)(file, `${config_1.default.AWS_CHB_PATH}${params.idCustomer}/${judicialBinnacle.dataValues.customerHasBankId}/${params.code}/case-file/${judicialBinnacle.dataValues.judicialFileCaseId}/binnacle`);
                // UPDATE NAME IN DATABASE
                newBinFile.update({
                    nameOriginAws: file.filename,
                });
                // DELETE TEMP FILE
                yield (0, helpers_1.deleteFile)("../public/docs", file.filename);
            }));
            const newJudicialBinnacle = yield this.findByID(id);
            return newJudicialBinnacle;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const judicialBinnacle = yield this.findByID(id);
            yield judicialBinnacle.destroy();
            return { id };
        });
    }
    // INFO: LOGIC FOR JOBS
    findAllBinnaclesByCHBJob(chb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss");
                const subqueryResults = yield sequelize_1.default.query(`
          SELECT jb1.id_judicial_binnacle
          FROM JUDICIAL_BINNACLE AS jb1
          JOIN (
            SELECT judicial_file_case_id_judicial_file_case AS judicialFileCaseId,
                   MIN(ABS(TIMESTAMPDIFF(SECOND, date, '${currentDate}'))) AS minDiff
            FROM JUDICIAL_BINNACLE
            WHERE deleted_at IS NULL
            GROUP BY judicial_file_case_id_judicial_file_case
          ) AS jb2
          ON jb1.judicial_file_case_id_judicial_file_case = jb2.judicialFileCaseId
          AND ABS(TIMESTAMPDIFF(SECOND, jb1.date, '${currentDate}')) = jb2.minDiff
          WHERE jb1.customer_has_bank_id_customer_has_bank = ? AND jb1.deleted_at IS NULL`, {
                    replacements: [chb],
                });
                const relevantIds = subqueryResults[0].map((result) => result.id_judicial_binnacle);
                const rta = yield models.JUDICIAL_BINNACLE.findAll({
                    where: {
                        id: {
                            [sequelize_2.Op.in]: relevantIds,
                        },
                        customer_has_bank_id_customer_has_bank: chb,
                        deleted_at: null,
                    },
                    include: [
                        {
                            model: models.JUDICIAL_CASE_FILE,
                            as: "judicialFileCase",
                            include: [
                                {
                                    model: models.CLIENT,
                                    as: "client",
                                    include: [
                                        {
                                            model: models.CITY,
                                            as: "city",
                                        },
                                    ],
                                },
                                {
                                    model: models.JUDICIAL_COURT,
                                    as: "judicialCourt",
                                },
                            ],
                        },
                        {
                            model: models.CUSTOMER_HAS_BANK,
                            as: "customerHasBank",
                            include: [
                                {
                                    model: models.BANK,
                                    as: "bank",
                                },
                            ],
                        },
                    ],
                    raw: true,
                });
                return rta;
            }
            catch (error) {
                console.error("Error in findAllBinnaclesByCHBJob:", error);
                throw error;
            }
        });
    }
}
exports.default = JudicialBinnacleService;

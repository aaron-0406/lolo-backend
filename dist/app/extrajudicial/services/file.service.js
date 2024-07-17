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
const sequelize_2 = require("sequelize");
const helpers_1 = require("../../../libs/helpers");
const aws_bucket_1 = require("../../../libs/aws_bucket");
const config_1 = __importDefault(require("../../../config/config"));
const path_1 = __importDefault(require("path"));
const { models } = sequelize_1.default;
class FileService {
    constructor() { }
    find(clientId, chb, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter } = query;
            const rta = yield models.FILE.findAll({
                include: [{
                        model: models.EXT_TAG,
                        as: "classificationTag",
                        foreignKey: "tagId",
                        attributes: ["name", "color"],
                    }],
                where: Object.assign({ clientId }, (filter ? { name: { [sequelize_2.Op.like]: `%${filter}%` } } : {})),
            });
            return rta;
        });
    }
    findOne(idCustomer, chb, code, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield models.FILE.findOne({
                where: {
                    id,
                },
                include: {
                    model: models.EXT_TAG,
                    as: "classificationTag",
                    attributes: ["name", "customerHasBankId"],
                },
            });
            if (!file) {
                throw boom_1.default.notFound("Archivo no encontrado");
            }
            const isStored = (0, helpers_1.isFileStoredIn)(path_1.default.join(__dirname, "../../../public/download"), file.dataValues.name);
            if (!isStored) {
                yield (0, aws_bucket_1.readFile)(`${config_1.default.AWS_CHB_PATH}${idCustomer}/${chb}/${code}/${file.dataValues.name}`);
            }
            return file;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clientId, code, idCustomer, chb } = data;
            const filesAdded = [];
            for (let i = 0; i < data.files.length; i++) {
                const { filename, originalname } = data.files[i];
                // UPLOAD TO AWS
                yield (0, aws_bucket_1.uploadFile)(data.files[i], `${config_1.default.AWS_CHB_PATH}${idCustomer}/${chb}/${code}`);
                // STORED IN DATABASE
                const newFile = yield models.FILE.create({
                    name: filename,
                    originalName: originalname,
                    clientId,
                    tagId: data.tagId,
                });
                // DELETE TEMP FILE
                yield (0, helpers_1.deleteFile)("../public/docs", filename);
                filesAdded.push(newFile);
            }
            return filesAdded;
        });
    }
    updateFile(id, originalName, tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield models.FILE.findOne({
                where: {
                    id_file: id,
                },
            });
            if (file) {
                const rta = yield file.update(Object.assign(Object.assign({}, file), { originalName, tagId }));
                return rta;
            }
            throw boom_1.default.notFound("Archivo no encontrado");
        });
    }
    delete(idCustomer, chb, code, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield models.FILE.findOne({
                where: {
                    id,
                },
            });
            if (!file)
                return -1;
            const newFile = JSON.parse(JSON.stringify(file));
            yield (0, aws_bucket_1.deleteFileBucket)(`${config_1.default.AWS_CHB_PATH}${idCustomer}/${chb}/${code}/${newFile.name}`);
            yield file.destroy();
            return { id };
        });
    }
}
exports.default = FileService;

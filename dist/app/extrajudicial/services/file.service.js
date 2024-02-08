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
const helpers_1 = require("../../../libs/helpers");
const aws_bucket_1 = require("../../../libs/aws_bucket");
const config_1 = __importDefault(require("../../../config/config"));
const path_1 = __importDefault(require("path"));
const { models } = sequelize_1.default;
class FileService {
    constructor() { }
    find(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rta = yield models.FILE.findAll({
                where: {
                    clientId,
                },
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
            // console.log(data);
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
            yield file.destroy();
            yield (0, aws_bucket_1.deleteFileBucket)(`${config_1.default.AWS_CHB_PATH}${idCustomer}/${chb}/${code}/${newFile.name}`);
            return { id };
        });
    }
}
exports.default = FileService;

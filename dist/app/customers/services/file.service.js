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
const { models } = sequelize_1.default;
class FileService {
    constructor() { }
    find(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            // const rta = await models.FILE.findAll({
            //   where: {
            //     clientId,
            //   },
            // });
            const result = yield (0, aws_bucket_1.readFile)("Acta conformidad Proyecto.docx");
            console.log(result);
            return "rta";
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield models.FILE.findOne({
                where: {
                    clientId: id,
                },
            });
            if (!file) {
                throw boom_1.default.notFound("Archivo no encontrado");
            }
            return file;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clientId, code, idBank } = data;
            // console.log(data);
            const filesAdded = [];
            for (let i = 0; i < data.files.length; i++) {
                const { filename, originalname } = data.files[i];
                // STORED IN DATABASE
                const newFile = yield models.FILE.create({
                    name: filename,
                    originalName: originalname,
                    clientId,
                });
                // UPLOAD TO AWS
                yield (0, aws_bucket_1.uploadFile)(data.files[i], `${config_1.default.AWS_BANK_PATH}${idBank}/${code}`);
                // DELETE TEMP FILE
                yield (0, helpers_1.deleteFile)("../public/docs", originalname);
                filesAdded.push(newFile);
            }
            return filesAdded;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.findOne(id);
            const rta = yield file.update(changes);
            return rta;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield models.FILE.findOne({
                where: {
                    id,
                },
            });
            if (!file)
                return -1;
            const newFile = JSON.parse(JSON.stringify(file));
            yield (0, helpers_1.deleteFile)("../public/docs/", newFile.name);
            yield file.destroy();
            return { id };
        });
    }
}
exports.default = FileService;

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
exports.deleteFileBucket = exports.createFolder = exports.readFile = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config/config"));
const path_1 = __importDefault(require("path"));
const { AWS_BUCKET_REGION, AWS_BUCKET_NAME, AWS_PUBLIC_KEY, AWS_SECRET_KEY } = config_1.default;
const client = new client_s3_1.S3Client({
    region: AWS_BUCKET_REGION,
    credentials: { accessKeyId: AWS_PUBLIC_KEY, secretAccessKey: AWS_SECRET_KEY },
});
const uploadFile = (file, pathname) => __awaiter(void 0, void 0, void 0, function* () {
    // Reading File
    const stream = fs_1.default.createReadStream(path_1.default.join(__dirname, "../public/docs/", file.filename));
    const uploadParam = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${pathname}/${file.filename}`,
        Body: stream,
    };
    // UPLOAD TO AWS
    const command = new client_s3_1.PutObjectCommand(uploadParam);
    return yield client.send(command);
});
exports.uploadFile = uploadFile;
const readFile = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const getParam = {
        Bucket: AWS_BUCKET_NAME,
        Key: filename,
    };
    const pathName = filename.split("/");
    const command = new client_s3_1.GetObjectCommand(getParam);
    const result = yield client.send(command);
    if (result.Body) {
        const stream = result.Body;
        const newFile = fs_1.default.createWriteStream(path_1.default.join(__dirname, "../public/download", pathName[pathName.length - 1]));
        stream.pipe(newFile);
        let end = new Promise(function (resolve, reject) {
            stream.on("end", () => resolve(stream.read()));
            stream.on("error", reject); // or something like that. might need to close `hash`
        });
        yield end;
        return;
    }
});
exports.readFile = readFile;
const createFolder = (folderName) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadParam = {
        Bucket: AWS_BUCKET_NAME,
        Key: folderName,
    };
    const command = new client_s3_1.PutObjectCommand(uploadParam);
    return yield client.send(command);
});
exports.createFolder = createFolder;
const deleteFileBucket = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadParam = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
    };
    const command = new client_s3_1.DeleteObjectCommand(uploadParam);
    return yield client.send(command);
});
exports.deleteFileBucket = deleteFileBucket;

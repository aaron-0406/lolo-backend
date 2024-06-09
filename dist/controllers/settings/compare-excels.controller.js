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
exports.compareExcelsController = void 0;
const compare_excels_service_1 = __importDefault(require("../../app/settings/services/compare-excels.service"));
const fs_1 = __importDefault(require("fs"));
const service = new compare_excels_service_1.default();
const compareExcelsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const prevFile = files.prevFile[0];
        const newFile = files.newFile[0];
        const reportPath = yield service.compareExcels(prevFile, newFile);
        res.download(reportPath, 'report.xlsx');
        const file = fs_1.default.createReadStream(reportPath);
        file.pipe(res);
        // res.download(reportPath)
        // console.log('File sent', reportPath)
        // fs.rm(reportPath, (err) => {
        //   if (err) console.error('Error deleting the report file:', err)
        // })
        // fs.rm(prevFile.path, (err) => {
        //   if (err) console.error('Error deleting the previous file:', err)
        // })
        // fs.rm(newFile.path, (err) => {
        //   if (err) console.error('Error deleting the new file:', err)
        // })
        // ========================================
        // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        // const fileStream = fs.createReadStream(reportPath)
        // fileStream.pipe(res)
        // fileStream.on('finish', () => {
        //   fs.rm(reportPath, (err) => {
        //     if (err) console.error('Error deleting the report file:', err)
        //   })
        //   fs.rm(prevFile.path, (err) => {
        //     if (err) console.error('Error deleting the previous file:', err)
        //   })
        //   fs.rm(newFile.path, (err) => {
        //     if (err) console.error('Error deleting the new file:', err)
        //   })
        // })
        // fileStream.on('error', (err) => {
        //   console.error('Error sending file:', err)
        //   next(err)
        // })
    }
    catch (error) {
        console.error('Error in compareExcelsController:', error);
        res.status(500).json({ error: error });
    }
});
exports.compareExcelsController = compareExcelsController;

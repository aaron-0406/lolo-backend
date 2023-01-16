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
exports.isFileStoredIn = exports.deleteFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// Delete file function
const deleteFile = (pathname, filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_extra_1.default.unlink(path_1.default.join(__dirname, pathname, filename));
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteFile = deleteFile;
const isFileStoredIn = (dirname, filename) => {
    const files = fs_extra_1.default.readdirSync(dirname);
    return files.some((file) => file === filename);
};
exports.isFileStoredIn = isFileStoredIn;

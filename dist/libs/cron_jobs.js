"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDownloadFolderTask = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const deleteDownloadFolderTask = () => {
    node_cron_1.default.schedule("30 * * * *", function () {
        fs_1.default.rmdir(path_1.default.join(__dirname, "../public/download"), { recursive: true }, (e) => {
            if (e)
                return;
            fs_1.default.mkdir(path_1.default.join(__dirname, "../public/download"), (e) => { });
        });
    });
};
exports.deleteDownloadFolderTask = deleteDownloadFolderTask;

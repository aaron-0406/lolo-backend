"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const error_handler_1 = __importDefault(require("./middlewares/error.handler"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const cron_jobs_1 = require("./libs/cron_jobs");
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = error_handler_1.default;
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
require("./libs/passport");
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
//CORS
const whitelist = [
    "http://localhost:8080",
    "https://myapp.co",
    "http://localhost:3000",
    "http://192.168.1.56:3000",
    "http://192.168.152.24:5000",
    "http://192.168.152.24:3000",
    "http://3.130.114.181:5000",
    "http://3.130.114.181:3000",
    "http://lolobank.com",
];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin !== null && origin !== void 0 ? origin : "") || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("no permitido"));
        }
    },
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
app.use(express_1.default.static(path_1.default.join(__dirname, "/public/build")));
(0, routes_1.default)(app);
// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/public/build", "index.html"));
});
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(port, () => {
    fs_1.default.mkdir(path_1.default.join(__dirname, "./public/download"), () => { });
    (0, cron_jobs_1.deleteDownloadFolderTask)();
    console.log("My port: " + port);
});

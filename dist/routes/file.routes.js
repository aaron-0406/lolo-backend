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
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../middlewares/validator.handler"));
const file_schema_1 = __importDefault(require("../app/customers/schemas/file.schema"));
const file_service_1 = __importDefault(require("../app/customers/services/file.service"));
const multer_handler_1 = require("../middlewares/multer.handler");
const boom_1 = __importDefault(require("@hapi/boom"));
const { createFileSchema, getFileSchema } = file_schema_1.default;
const router = express_1.default.Router();
const service = new file_service_1.default();
const multerFile = (req, res, next) => {
    multer_handler_1.archivos.array("file")(req, res, (err) => {
        if (err)
            return next(boom_1.default.badRequest(err));
        return next();
    });
};
router.get("/:idBank/:code/:id", (0, validator_handler_1.default)(getFileSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, idBank, code } = req.params;
        const files = yield service.find(Number(id), Number(idBank), Number(code));
        res.json(files);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/:idBank/:code/:id", (0, validator_handler_1.default)(createFileSchema, "params"), multerFile, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.clientId = Number(req.params.id);
        req.body.idBank = Number(req.params.idBank);
        req.body.code = Number(req.params.code);
        req.body.files = req.files;
        const { body } = req;
        const newFile = yield service.create(body);
        res.status(201).json(newFile);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
// router.put(
//   "/:id",
//   validatorHandler(getCitySchema, "params"),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const city = await service.update(id, body);
//       res.json(city);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
router.delete("/:idBank/:code/:id", (0, validator_handler_1.default)(createFileSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, code, idBank } = req.params;
        yield service.delete(Number(idBank), Number(code), Number(id));
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

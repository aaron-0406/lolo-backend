"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_handler_1 = __importDefault(require("../../middlewares/validator.handler"));
const file_schema_1 = __importDefault(require("../../app/extrajudicial/schemas/file.schema"));
const multer_handler_1 = require("../../middlewares/multer.handler");
const boom_1 = __importDefault(require("@hapi/boom"));
const file_controller_1 = require("../../controllers/extrajudicial/file.controller");
const auth_handler_1 = require("../../middlewares/auth.handler");
const { createFileSchema, updateFileSchema, deleteFileSchema, getFileSchema, getFileByIdSchema, } = file_schema_1.default;
const router = express_1.default.Router();
const multerFile = (req, res, next) => {
    multer_handler_1.archivos.array("file")(req, res, (err) => {
        if (err)
            return next(boom_1.default.badRequest(err));
        return next();
    });
};
router.get("/:id", auth_handler_1.JWTAuth, (0, validator_handler_1.default)(getFileSchema, "params"), file_controller_1.findFileByClientIdController);
router.get("/single/:idCustomer/:chb/:code/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-03-01"), (0, validator_handler_1.default)(getFileSchema, "params"), file_controller_1.findFileByIdController);
router.post("/:idCustomer/:chb/:code/:id/:tagId", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-03-02"), (0, validator_handler_1.default)(createFileSchema, "params"), multerFile, file_controller_1.createFileController);
router.patch("/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-03-04"), (0, validator_handler_1.default)(getFileByIdSchema, "params"), (0, validator_handler_1.default)(updateFileSchema, "body"), file_controller_1.updateFileController);
router.delete("/:idCustomer/:chb/:code/:id", auth_handler_1.JWTAuth, (0, auth_handler_1.checkPermissions)("P02-02-03-03"), (0, validator_handler_1.default)(deleteFileSchema, "params"), file_controller_1.deleteFileController);
exports.default = router;

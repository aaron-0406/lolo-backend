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
const comment_schema_1 = __importDefault(require("../app/extrajudicial/schemas/comment.schema"));
const comment_service_1 = __importDefault(require("../app/extrajudicial/services/comment.service"));
const { getCommentByClientIDSchema, getCommentByIDSchema, createCommentSchema, updateCommentSchema, } = comment_schema_1.default;
const router = express_1.default.Router();
const service = new comment_service_1.default();
router.get("/all-client/:clientId", (0, validator_handler_1.default)(getCommentByClientIDSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const comments = yield service.findAllByClient(clientId);
        res.json(comments);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:id", (0, validator_handler_1.default)(getCommentByIDSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const comment = yield service.findByID(id);
        res.json(comment);
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (0, validator_handler_1.default)(createCommentSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const newComment = yield service.create(body);
        res.status(201).json(newComment);
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/:id", (0, validator_handler_1.default)(getCommentByIDSchema, "params"), (0, validator_handler_1.default)(updateCommentSchema, "body"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const comment = yield service.update(id, body);
        res.json(comment);
    }
    catch (error) {
        next(error);
    }
}));
router.delete("/:id", (0, validator_handler_1.default)(getCommentByIDSchema, "params"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield service.delete(id);
        res.status(201).json({ id });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;

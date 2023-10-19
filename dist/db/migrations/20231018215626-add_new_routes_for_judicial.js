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
exports.down = exports.up = void 0;
const permission_model_1 = __importDefault(require("../models/permission.model"));
const { PERMISSION_TABLE } = permission_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        return queryInterface.bulkInsert(PERMISSION_TABLE, [
            {
                name: "EXPEDIENTES",
                code: "P13",
                icon: "ri-bank-fill",
                link: "/judicial/:urlIdentifier/expedientes",
            },
            {
                name: "DETALLES DEL EXPEDIENTE",
                code: "P13-01",
                icon: "-",
                link: "/judicial/:urlIdentifier/expedientes/:code",
            },
        ]);
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        return queryInterface.bulkDelete(PERMISSION_TABLE, {});
    });
}
exports.down = down;

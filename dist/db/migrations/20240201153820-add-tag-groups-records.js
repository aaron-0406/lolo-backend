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
const ext_tag_group_model_1 = __importDefault(require("../models/ext-tag-group.model"));
const { EXT_TAG_GROUP_TABLE } = ext_tag_group_model_1.default;
const newTagGroups = [
    {
        name: "Archivos",
        customerHasBankId: 1,
    },
    {
        name: "Productos",
        customerHasBankId: 1,
    },
    {
        name: "Clientes",
        customerHasBankId: 1,
    },
];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.bulkInsert(EXT_TAG_GROUP_TABLE, newTagGroups);
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        // INFO: DON'T DELETE RECORDS
    });
}
exports.down = down;

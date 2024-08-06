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
const sequelize_1 = require("sequelize");
const client_model_1 = __importDefault(require("../models/client.model"));
const judicial_case_file_model_1 = __importDefault(require("../models/judicial-case-file.model"));
const { CLIENT_TABLE } = client_model_1.default;
const { JUDICIAL_CASE_FILE_TABLE } = judicial_case_file_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield queryInterface.sequelize.query(`SELECT id_client, chb_transferred FROM ${CLIENT_TABLE} WHERE chb_transferred IS NOT NULL`, { type: sequelize_1.QueryTypes.SELECT });
        if (Array.isArray(results) && results.length > 0) {
            yield Promise.all(results.map((r) => __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.sequelize.query(`UPDATE ${JUDICIAL_CASE_FILE_TABLE} SET chb_transferred = :chb_transferred WHERE client_id_client = :id_client`, {
                    replacements: {
                        chb_transferred: r.chb_transferred,
                        id_client: r.id_client,
                    },
                });
            })));
        }
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        return queryInterface.sequelize.query(`UPDATE ${JUDICIAL_CASE_FILE_TABLE} SET chb_transferred = customer_has_bank_id WHERE customer_has_bank_id IS NOT NULL AND chb_transferred IS NOT NULL`);
    });
}
exports.down = down;

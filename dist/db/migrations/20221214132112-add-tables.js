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
const bank_model_1 = __importDefault(require("../models/bank.model"));
const city_model_1 = __importDefault(require("../models/city.model"));
const client_model_1 = __importDefault(require("../models/client.model"));
const customer_user_model_1 = __importDefault(require("../models/customer-user.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const module_model_1 = __importDefault(require("../models/module.model"));
const user_app_model_1 = __importDefault(require("../models/user-app.model"));
const customer_has_bank_model_1 = __importDefault(require("../models/many-to-many/customer-has-bank.model"));
const funcionario_model_1 = __importDefault(require("../models/funcionario.model"));
const direction_model_1 = __importDefault(require("../models/direction.model"));
// import guarantorModel from "../models/guarantor.model";
const comment_model_1 = __importDefault(require("../models/comment.model"));
const file_model_1 = __importDefault(require("../models/file.model"));
const negotiation_model_1 = __importDefault(require("../models/negotiation.model"));
const { BankSchema, BANK_TABLE } = bank_model_1.default;
const { FuncionarioSchema, FUNCIONARIO_TABLE } = funcionario_model_1.default;
const { CitySchema, CITY_TABLE } = city_model_1.default;
const { ClientSchema, CLIENT_TABLE } = client_model_1.default;
const { CustomerUserSchema, CUSTOMER_USER_TABLE } = customer_user_model_1.default;
const { CustomerSchema, CUSTOMER_TABLE } = customer_model_1.default;
const { ModuleSchema, MODULE_TABLE } = module_model_1.default;
const { FileSchema, FILE_TABLE } = file_model_1.default;
const { UserAppSchema, USER_APP_TABLE } = user_app_model_1.default;
const { CustomerHasBankSchema, CUSTOMER_HAS_BANK_TABLE } = customer_has_bank_model_1.default;
const { DirectionSchema, DIRECTION_TABLE } = direction_model_1.default;
// const { GuarantorSchema, GUARANTOR_TABLE } = guarantorModel;
const { CommentSchema, COMMENT_TABLE } = comment_model_1.default;
const { NegotiationSchema, NEGOTIATION_TABLE } = negotiation_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
        yield queryInterface.createTable(CUSTOMER_USER_TABLE, CustomerUserSchema);
        yield queryInterface.createTable(BANK_TABLE, BankSchema);
        yield queryInterface.createTable(CITY_TABLE, CitySchema);
        yield queryInterface.createTable(CUSTOMER_HAS_BANK_TABLE, CustomerHasBankSchema);
        yield queryInterface.createTable(FUNCIONARIO_TABLE, FuncionarioSchema);
        yield queryInterface.createTable(NEGOTIATION_TABLE, NegotiationSchema);
        yield queryInterface.createTable(CLIENT_TABLE, ClientSchema);
        yield queryInterface.createTable(FILE_TABLE, FileSchema);
        yield queryInterface.createTable(MODULE_TABLE, ModuleSchema);
        yield queryInterface.createTable(USER_APP_TABLE, UserAppSchema);
        yield queryInterface.createTable(DIRECTION_TABLE, DirectionSchema);
        // await queryInterface.createTable(GUARANTOR_TABLE, GuarantorSchema);
        yield queryInterface.createTable(COMMENT_TABLE, CommentSchema);
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.dropTable(CUSTOMER_TABLE);
        yield queryInterface.dropTable(FUNCIONARIO_TABLE);
        yield queryInterface.dropTable(NEGOTIATION_TABLE);
        yield queryInterface.dropTable(BANK_TABLE);
        yield queryInterface.dropTable(CITY_TABLE);
        yield queryInterface.dropTable(CLIENT_TABLE);
        yield queryInterface.dropTable(CUSTOMER_USER_TABLE);
        yield queryInterface.dropTable(MODULE_TABLE);
        yield queryInterface.dropTable(FILE_TABLE);
        yield queryInterface.dropTable(USER_APP_TABLE);
        yield queryInterface.dropTable(DIRECTION_TABLE);
        // await queryInterface.dropTable(GUARANTOR_TABLE);
        yield queryInterface.dropTable(COMMENT_TABLE);
        yield queryInterface.dropTable(CUSTOMER_HAS_BANK_TABLE);
    });
}
exports.down = down;

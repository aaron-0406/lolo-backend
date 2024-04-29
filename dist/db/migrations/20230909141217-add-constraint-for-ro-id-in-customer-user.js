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
const customer_user_model_1 = __importDefault(require("../models/customer-user.model"));
const roles_model_1 = __importDefault(require("../models/roles.model"));
const { CUSTOMER_USER_TABLE } = customer_user_model_1.default;
const { ROLE_TABLE } = roles_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addConstraint(CUSTOMER_USER_TABLE, {
            fields: ["role_id_role"],
            type: "foreign key",
            name: "fk_customer-user_role",
            references: {
                table: ROLE_TABLE,
                field: "id_role",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeConstraint(CUSTOMER_USER_TABLE, "fk_customer-user_role");
    });
}
exports.down = down;

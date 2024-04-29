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
const comment_model_1 = __importDefault(require("../models/comment.model"));
const direction_model_1 = __importDefault(require("../models/direction.model"));
const file_model_1 = __importDefault(require("../models/file.model"));
const guarantor_model_1 = __importDefault(require("../models/guarantor.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const goal_user_model_1 = __importDefault(require("../models/goal-user.model"));
const goal_model_1 = __importDefault(require("../models/goal.model"));
const client_model_1 = __importDefault(require("../models/client.model"));
const customer_user_model_1 = __importDefault(require("../models/customer-user.model"));
const ecampo_model_1 = __importDefault(require("../models/ecampo.model"));
const template_model_1 = __importDefault(require("../models/template.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const template_img_model_1 = __importDefault(require("../models/template-img.model"));
const { COMMENT_TABLE } = comment_model_1.default;
const { CUSTOMER_USER_TABLE } = customer_user_model_1.default;
const { DIRECTION_TABLE } = direction_model_1.default;
const { FILE_TABLE } = file_model_1.default;
const { GUARANTOR_TABLE } = guarantor_model_1.default;
const { PRODUCT_TABLE } = product_model_1.default;
const { CUSTOMER_TABLE } = customer_model_1.default;
const { GOAL_USER_TABLE } = goal_user_model_1.default;
const { GOAL_TABLE } = goal_model_1.default;
const { CLIENT_TABLE } = client_model_1.default;
const { ECAMPO_TABLE } = ecampo_model_1.default;
const { TEMPLATE_TABLE } = template_model_1.default;
const { TEMPLATE_IMG_TABLE } = template_img_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeConstraint(COMMENT_TABLE, "COMMENT_ibfk_2");
        yield queryInterface.addConstraint(COMMENT_TABLE, {
            fields: ["client_id_client"],
            type: "foreign key",
            name: "COMMENT_ibfk_2",
            references: {
                table: CLIENT_TABLE,
                field: "id_client",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.removeConstraint(COMMENT_TABLE, "COMMENT_ibfk_1");
        yield queryInterface.addConstraint(COMMENT_TABLE, {
            fields: ["customer_user_id_customer_user"],
            type: "foreign key",
            name: "COMMENT_ibfk_1",
            references: {
                table: CUSTOMER_USER_TABLE,
                field: "id_customer_user",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.removeConstraint(DIRECTION_TABLE, "DIRECTION_ibfk_1");
        yield queryInterface.addConstraint(DIRECTION_TABLE, {
            fields: ["client_id_client"],
            type: "foreign key",
            name: "DIRECTION_ibfk_1",
            references: {
                table: CLIENT_TABLE,
                field: "id_client",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.removeConstraint(ECAMPO_TABLE, "ECAMPO_ibfk_1");
        yield queryInterface.addConstraint(ECAMPO_TABLE, {
            fields: ["template_id_template"],
            type: "foreign key",
            name: "ECAMPO_ibfk_1",
            references: {
                table: TEMPLATE_TABLE,
                field: "id_template",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.removeConstraint(FILE_TABLE, "FILE_ibfk_1");
        yield queryInterface.addConstraint(FILE_TABLE, {
            fields: ["id_client"],
            type: "foreign key",
            name: "FILE_ibfk_1",
            references: {
                table: CLIENT_TABLE,
                field: "id_client",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.removeConstraint(GOAL_USER_TABLE, "GOAL_USER_ibfk_2");
        yield queryInterface.addConstraint(GOAL_USER_TABLE, {
            fields: ["customer_user_id_customer_user"],
            type: "foreign key",
            name: "GOAL_USER_ibfk_2",
            references: {
                table: CUSTOMER_USER_TABLE,
                field: "id_customer_user",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.removeConstraint(GOAL_TABLE, "fk_goal_customer");
        yield queryInterface.addConstraint(GOAL_TABLE, {
            fields: ["customer_id_customer"],
            type: "foreign key",
            name: "fk_goal_customer",
            references: {
                table: CUSTOMER_TABLE,
                field: "id_customer",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.removeConstraint(GUARANTOR_TABLE, "GUARANTOR_ibfk_1");
        yield queryInterface.addConstraint(GUARANTOR_TABLE, {
            fields: ["client_id_client"],
            type: "foreign key",
            name: "GUARANTOR_ibfk_1",
            references: {
                table: CLIENT_TABLE,
                field: "id_client",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.removeConstraint(PRODUCT_TABLE, "PRODUCT_ibfk_2");
        yield queryInterface.addConstraint(PRODUCT_TABLE, {
            fields: ["customer_id_customer"],
            type: "foreign key",
            name: "PRODUCT_ibfk_2",
            references: {
                table: CUSTOMER_TABLE,
                field: "id_customer",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.removeConstraint(TEMPLATE_IMG_TABLE, "TEMPLATE_IMG_ibfk_1");
        yield queryInterface.addConstraint(TEMPLATE_IMG_TABLE, {
            fields: ["template_id_template"],
            type: "foreign key",
            name: "TEMPLATE_IMG_ibfk_1",
            references: {
                table: TEMPLATE_TABLE,
                field: "id_template",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeConstraint(COMMENT_TABLE, "COMMENT_ibfk_2");
        yield queryInterface.removeConstraint(COMMENT_TABLE, "customer_user_id_customer_user");
        yield queryInterface.removeConstraint(DIRECTION_TABLE, "DIRECTION_ibfk_1");
        yield queryInterface.removeConstraint(ECAMPO_TABLE, "template_id_template");
        yield queryInterface.removeConstraint(DIRECTION_TABLE, "DIRECTION_ibfk_1");
        yield queryInterface.removeConstraint(FILE_TABLE, "FILE_ibfk_1");
        yield queryInterface.removeConstraint(GOAL_USER_TABLE, "fk_goal_user_customer_user");
        yield queryInterface.removeConstraint(GOAL_TABLE, "fk_goal_customer");
        yield queryInterface.removeConstraint(GUARANTOR_TABLE, "GUARANTOR_ibfk_1");
        yield queryInterface.removeConstraint(PRODUCT_TABLE, "customer_id_customer");
        yield queryInterface.removeConstraint(TEMPLATE_IMG_TABLE, "template_id_template");
        yield queryInterface.addConstraint(COMMENT_TABLE, {
            fields: ["client_id_client"],
            type: "foreign key",
            name: "COMMENT_ibfk_2",
            references: {
                table: CLIENT_TABLE,
                field: "id_client",
            },
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        yield queryInterface.addConstraint(COMMENT_TABLE, {
            fields: ["customer_user_id_customer_user"],
            type: "foreign key",
            name: "customer_user_id_customer_user",
            references: {
                table: CUSTOMER_USER_TABLE,
                field: "id_customer_user",
            },
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        yield queryInterface.addConstraint(DIRECTION_TABLE, {
            fields: ["client_id_client"],
            type: "foreign key",
            name: "DIRECTION_ibfk_1",
            references: {
                table: CLIENT_TABLE,
                field: "id_client",
            },
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        yield queryInterface.addConstraint(ECAMPO_TABLE, {
            fields: ["template_id_template"],
            type: "foreign key",
            name: "template_id_template",
            references: {
                table: TEMPLATE_TABLE,
                field: "id_template",
            },
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        yield queryInterface.addConstraint(FILE_TABLE, {
            fields: ["id_client"],
            type: "foreign key",
            name: "DIRECTION_ibfk_1",
            references: {
                table: CLIENT_TABLE,
                field: "id_client",
            },
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        yield queryInterface.addConstraint(GOAL_USER_TABLE, {
            fields: ["customer_user_id_customer_user"],
            type: "foreign key",
            name: "fk_goal_user_customer_user",
            references: {
                table: CUSTOMER_USER_TABLE,
                field: "id_customer_user",
            },
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        yield queryInterface.addConstraint(GOAL_TABLE, {
            fields: ["customer_id_customer"],
            type: "foreign key",
            name: "fk_goal_customer",
            references: {
                table: CUSTOMER_TABLE,
                field: "id_customer",
            },
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        yield queryInterface.addConstraint(GUARANTOR_TABLE, {
            fields: ["client_id_client"],
            type: "foreign key",
            name: "GUARANTOR_ibfk_1",
            references: {
                table: CLIENT_TABLE,
                field: "id_client",
            },
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        yield queryInterface.addConstraint(PRODUCT_TABLE, {
            fields: ["customer_id_customer"],
            type: "foreign key",
            name: "customer_id_customer",
            references: {
                table: CUSTOMER_TABLE,
                field: "id_customer",
            },
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
        yield queryInterface.addConstraint(TEMPLATE_IMG_TABLE, {
            fields: ["template_id_template"],
            type: "foreign key",
            name: "template_id_template",
            references: {
                table: TEMPLATE_TABLE,
                field: "id_template",
            },
            onUpdate: "NO ACTION",
            onDelete: "CASCADE",
        });
    });
}
exports.down = down;

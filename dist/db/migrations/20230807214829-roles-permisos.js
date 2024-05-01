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
const roles_model_1 = __importDefault(require("../models/roles.model"));
const customer_model_1 = __importDefault(require("../models/customer.model"));
const permission_model_1 = __importDefault(require("../models/permission.model"));
const role_permission_model_1 = __importDefault(require("../models/many-to-many/role-permission.model"));
const customer_user_model_1 = __importDefault(require("../models/customer-user.model"));
const user_app_model_1 = __importDefault(require("../models/user-app.model"));
const { ROLE_TABLE } = roles_model_1.default;
const { PERMISSION_TABLE } = permission_model_1.default;
const { ROLE_PERMISSION_TABLE } = role_permission_model_1.default;
const { CUSTOMER_TABLE } = customer_model_1.default;
const { CUSTOMER_USER_TABLE } = customer_user_model_1.default;
const { USER_APP_TABLE } = user_app_model_1.default;
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(ROLE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_role",
                type: sequelize_1.DataTypes.INTEGER,
            },
            name: { type: sequelize_1.DataTypes.STRING(150), allowNull: false },
            customerId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                field: "customer_id_customer",
                references: {
                    model: CUSTOMER_TABLE,
                    key: "id_customer",
                },
            },
        });
        yield queryInterface.addConstraint(ROLE_TABLE, {
            fields: ["customer_id_customer"],
            type: "foreign key",
            name: "fk_role_customer",
            references: {
                table: CUSTOMER_TABLE,
                field: "id_customer",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.createTable(PERMISSION_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_permission",
                type: sequelize_1.DataTypes.INTEGER,
            },
            name: { type: sequelize_1.DataTypes.STRING(150), allowNull: false },
            code: { type: sequelize_1.DataTypes.STRING(150), allowNull: false },
            icon: { type: sequelize_1.DataTypes.STRING(150), allowNull: false },
        });
        yield queryInterface.createTable(ROLE_PERMISSION_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_role_permission",
                type: sequelize_1.DataTypes.INTEGER,
            },
            permissionId: {
                allowNull: false,
                type: sequelize_1.DataTypes.INTEGER,
                field: "permission_id_permission",
                references: {
                    model: PERMISSION_TABLE,
                    key: "id_permission",
                },
            },
            roleId: {
                allowNull: false,
                field: "role_id_role",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: ROLE_TABLE,
                    key: "id_role",
                },
            },
        });
        yield queryInterface.addConstraint(ROLE_PERMISSION_TABLE, {
            fields: ["permission_id_permission"],
            type: "foreign key",
            name: "fk_role_permission_permission",
            references: {
                table: PERMISSION_TABLE,
                field: "id_permission",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.addConstraint(ROLE_PERMISSION_TABLE, {
            fields: ["role_id_role"],
            type: "foreign key",
            name: "fk_role_permission_role",
            references: {
                table: ROLE_TABLE,
                field: "id_role",
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
        });
        yield queryInterface.addColumn(CUSTOMER_USER_TABLE, "role_id_role", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        });
        yield queryInterface.addColumn(USER_APP_TABLE, "role_id_role", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        });
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeConstraint(ROLE_TABLE, "fk_role_customer");
        yield queryInterface.removeConstraint(ROLE_PERMISSION_TABLE, "fk_role_permission_permission");
        yield queryInterface.removeConstraint(ROLE_PERMISSION_TABLE, "fk_role_permission_role");
        yield queryInterface.dropTable(ROLE_TABLE);
        yield queryInterface.dropTable(PERMISSION_TABLE);
        yield queryInterface.dropTable(ROLE_PERMISSION_TABLE);
        yield queryInterface.removeColumn(CUSTOMER_USER_TABLE, "role_id_role");
        yield queryInterface.removeColumn(USER_APP_TABLE, "role_id_role");
    });
}
exports.down = down;

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
exports.up = void 0;
const sequelize_1 = require("sequelize");
const department_model_1 = __importDefault(require("../models/settings/department.model"));
const province_model_1 = __importDefault(require("../models/settings/province.model"));
const district_model_1 = __importDefault(require("../models/settings/district.model"));
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.createTable(department_model_1.default.DEPARTMENT_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_department",
                type: sequelize_1.DataTypes.INTEGER,
            },
            name: {
                field: "name",
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(150),
            },
            code: {
                field: "code",
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(10),
            },
            createdAt: {
                allowNull: false,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                field: "updated_at",
                defaultValue: sequelize_1.DataTypes.NOW,
                type: sequelize_1.DataTypes.DATE,
            },
            deletedAt: {
                allowNull: true,
                field: "deleted_at",
                type: sequelize_1.DataTypes.DATE,
            },
        });
        yield queryInterface.createTable(province_model_1.default.PROVINCE_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_province",
                type: sequelize_1.DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(150),
            },
            code: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(10),
            },
            departmentId: {
                allowNull: false,
                field: "department_id_department",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: department_model_1.default.DEPARTMENT_TABLE,
                    key: "id_department",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            createdAt: {
                allowNull: false,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                field: "updated_at",
                defaultValue: sequelize_1.DataTypes.NOW,
                type: sequelize_1.DataTypes.DATE,
            },
            deletedAt: {
                allowNull: true,
                field: "deleted_at",
                type: sequelize_1.DataTypes.DATE,
            },
        });
        yield queryInterface.createTable(district_model_1.default.DISTRICT_TABLE, {
            id: {
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_district",
                type: sequelize_1.DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(150),
            },
            code: {
                allowNull: false,
                type: sequelize_1.DataTypes.STRING(10),
            },
            provinceId: {
                allowNull: false,
                field: "province_id_province",
                type: sequelize_1.DataTypes.INTEGER,
                references: {
                    model: province_model_1.default.PROVINCE_TABLE,
                    key: "id_province",
                },
                onUpdate: "CASCADE",
                onDelete: "NO ACTION",
            },
            createdAt: {
                allowNull: false,
                field: "created_at",
                defaultValue: sequelize_1.DataTypes.NOW,
                type: sequelize_1.DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                field: "updated_at",
                defaultValue: sequelize_1.DataTypes.NOW,
                type: sequelize_1.DataTypes.DATE,
            },
            deletedAt: {
                allowNull: true,
                field: "deleted_at",
                type: sequelize_1.DataTypes.DATE,
            },
        });
        function down(queryInterface) {
            return __awaiter(this, void 0, void 0, function* () {
                yield queryInterface.dropTable(department_model_1.default.DEPARTMENT_TABLE);
                yield queryInterface.dropTable(province_model_1.default.PROVINCE_TABLE);
                yield queryInterface.dropTable(district_model_1.default.DISTRICT_TABLE);
            });
        }
    });
}
exports.up = up;

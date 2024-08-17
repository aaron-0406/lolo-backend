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
const judicial_binnacle_model_1 = __importDefault(require("../models/judicial-binnacle.model"));
const judicial_bin_notification_model_1 = __importDefault(require("../models/judicial-bin-notification.model"));
const permission_model_1 = __importDefault(require("../models/permission.model"));
const { JUDICIAL_BINNACLE_TABLE } = judicial_binnacle_model_1.default;
const { JUDICIAL_BIN_NOTIFICATION_TABLE } = judicial_bin_notification_model_1.default;
const { PERMISSION_TABLE } = permission_model_1.default;
const newPermissions = [
    {
        name: 'DETALLES DE LA BITACORA',
        code: 'P13-01-01-04',
        icon: '-',
        link: '/judicial/:urlIdentifier/expediente/:code/bitacora/:binnacleCode'
    },
    {
        name: 'AGREGAR NOTIFICACIÓN',
        code: 'P13-01-01-04-01',
        icon: '-',
        link: '#'
    },
    {
        name: 'ACTUALIZAR NOTIFICACIÓN',
        code: 'P13-01-01-04-02',
        icon: '-',
        link: '#'
    },
    {
        name: 'ELIMINAR NOTIFICACIÓN',
        code: 'P13-01-01-04-03',
        icon: '-',
        link: '#'
    }
];
function up(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'index', {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        });
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'resolution_date', {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        });
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'entry_date', {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        });
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'notification_type', {
            type: sequelize_1.DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null
        });
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'acto', {
            type: sequelize_1.DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null
        });
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'fojas', {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        });
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'folios', {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        });
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'provedio_date', {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        });
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'user_description', {
            type: sequelize_1.DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null
        });
        yield queryInterface.addColumn(JUDICIAL_BINNACLE_TABLE, 'created_by', {
            type: sequelize_1.DataTypes.STRING(200),
            allowNull: true,
            defaultValue: null
        });
        yield queryInterface.createTable(JUDICIAL_BIN_NOTIFICATION_TABLE, {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            number: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            addressee: {
                type: sequelize_1.DataTypes.STRING(200),
                allowNull: false,
            },
            shipDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            attachments: {
                type: sequelize_1.DataTypes.STRING(200),
                allowNull: false,
            },
            deliveryMethod: {
                type: sequelize_1.DataTypes.STRING(200),
                allowNull: false,
            },
            resolutionDate: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            notificationPrint: {
                type: sequelize_1.DataTypes.STRING(200),
                allowNull: false,
            },
            sentCentral: {
                type: sequelize_1.DataTypes.STRING(200),
                allowNull: false,
            },
            centralReceipt: {
                type: sequelize_1.DataTypes.STRING(200),
                allowNull: false,
            },
            idJudicialBinacle: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: JUDICIAL_BINNACLE_TABLE,
                    key: 'id_judicial_binnacle',
                },
                onUpdate: 'CASCADE',
                onDelete: 'NO ACTION',
            },
        });
        yield queryInterface.bulkInsert(PERMISSION_TABLE, newPermissions);
    });
}
exports.up = up;
function down(queryInterface) {
    return __awaiter(this, void 0, void 0, function* () {
        yield queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, 'notificationType');
        yield queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, 'userDescription');
        yield queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, 'fojas');
        yield queryInterface.removeColumn(JUDICIAL_BINNACLE_TABLE, 'createdBy');
        yield queryInterface.dropTable(JUDICIAL_BIN_NOTIFICATION_TABLE);
        const deleteCriteria = {
            code: {
                [sequelize_1.Op.startsWith]: [
                    "P13-01-01-04",
                    "P13-01-01-04-01",
                    "P13-01-01-04-02",
                    "P13-01-01-04-03",
                ],
            },
        };
        yield queryInterface.bulkDelete(PERMISSION_TABLE, deleteCriteria);
    });
}
exports.down = down;

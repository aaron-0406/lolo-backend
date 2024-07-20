"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const client_model_1 = __importDefault(require("./client.model"));
const city_model_1 = __importDefault(require("./city.model"));
const judicial_sede_model_1 = __importDefault(require("./judicial-sede.model"));
const judicial_court_model_1 = __importDefault(require("./judicial-court.model"));
const judicial_procedural_way_model_1 = __importDefault(require("./judicial-procedural-way.model"));
const judicial_subject_model_1 = __importDefault(require("./judicial-subject.model"));
const judicial_process_reason_model_1 = __importDefault(require("./judicial-process-reason.model"));
const customer_user_model_1 = __importDefault(require("./customer-user.model"));
const customer_has_bank_model_1 = __importDefault(require("./many-to-many/customer-has-bank.model"));
const bank_model_1 = __importDefault(require("./bank.model"));
const JUDICIAL_CASE_FILE_TABLE = "JUDICIAL_CASE_FILE";
const { BANK_TABLE } = bank_model_1.default;
const JudicialCaseFileSchema = {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        field: "id_judicial_case_file",
        type: sequelize_1.DataTypes.INTEGER,
    },
    numberCaseFile: {
        allowNull: false,
        field: "number_case_file",
        type: sequelize_1.DataTypes.STRING(150),
    },
    judgmentNumber: {
        allowNull: true,
        field: "judgment_number",
        type: sequelize_1.DataTypes.INTEGER,
    },
    secretary: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(150),
    },
    amountDemandedSoles: {
        allowNull: true,
        field: "amount_demanded_soles",
        type: sequelize_1.DataTypes.DECIMAL(10, 3),
    },
    amountDemandedDollars: {
        allowNull: true,
        field: "amount_demanded_dollars",
        type: sequelize_1.DataTypes.DECIMAL(10, 3),
    },
    cautionaryCode: {
        allowNull: true,
        field: "cautionary_code",
        type: sequelize_1.DataTypes.STRING(150),
    },
    errandCode: {
        allowNull: true,
        field: "errand_code",
        type: sequelize_1.DataTypes.STRING(150),
    },
    judicialSedeId: {
        allowNull: true,
        field: "judicial_sede_id_judicial_sede",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: judicial_sede_model_1.default.JUDICIAL_SEDE_TABLE,
            key: "id_judicial_sede",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    judge: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING(150),
    },
    demandDate: {
        field: "demand_date",
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
    createdAt: {
        allowNull: false,
        field: "created_at",
        defaultValue: sequelize_1.DataTypes.NOW,
        type: sequelize_1.DataTypes.DATE,
    },
    clientId: {
        allowNull: false,
        field: "client_id_client",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: client_model_1.default.CLIENT_TABLE,
            key: "id_client",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    cityId: {
        allowNull: false,
        field: "city_id_city",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: city_model_1.default.CITY_TABLE,
            key: "id_city",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    customerUserId: {
        allowNull: false,
        field: "customer_user_id_customer_user",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: customer_user_model_1.default.CUSTOMER_USER_TABLE,
            key: "id_customer_user",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    judicialCourtId: {
        allowNull: false,
        field: "judicial_court_id_judicial_court",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: judicial_court_model_1.default.JUDICIAL_COURT_TABLE,
            key: "id_judicial_court",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    judicialSubjectId: {
        allowNull: false,
        field: "judicial_subject_id_judicial_subject",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: judicial_subject_model_1.default.JUDICIAL_SUBJECT_TABLE,
            key: "id_judicial_subject",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    judicialProceduralWayId: {
        allowNull: false,
        field: "judicial_procedural_way_id_judicial_procedural_way",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: judicial_procedural_way_model_1.default.JUDICIAL_PROCEDURAL_WAY_TABLE,
            key: "id_judicial_procedural_way",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    customerHasBankId: {
        allowNull: false,
        field: "customer_has_bank_id",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: customer_has_bank_model_1.default.CUSTOMER_HAS_BANK_TABLE,
            key: "id_customer_has_bank",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    processStatus: {
        allowNull: true,
        field: "process_status",
        type: sequelize_1.DataTypes.STRING(150),
    },
    processComment: {
        allowNull: true,
        field: "process_comment",
        type: sequelize_1.DataTypes.TEXT("long"),
    },
    processReasonId: {
        allowNull: true,
        field: "process_reason_id",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: judicial_process_reason_model_1.default.JUDICIAL_PROCESS_REASON_TABLE,
            key: "id_judicial_process_status_reason",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    idJudicialCaseFileRelated: {
        allowNull: true,
        field: "id_judicial_case_file_related",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: JUDICIAL_CASE_FILE_TABLE,
            key: "id_judicial_case_file",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    bankId: {
        allowNull: true,
        field: "id_bank",
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: BANK_TABLE,
            key: "id_bank",
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
    },
    qrCode: {
        allowNull: true,
        field: "qr_code",
        type: sequelize_1.DataTypes.TEXT("long"),
    },
    impulseStatus: {
        allowNull: true,
        field: "impulse_status",
        type: sequelize_1.DataTypes.INTEGER,
    },
};
class JudicialCaseFile extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.CLIENT, { as: "client" });
        this.belongsTo(models.JUDICIAL_COURT, { as: "judicialCourt" });
        this.belongsTo(models.JUDICIAL_SUBJECT, { as: "judicialSubject" });
        this.belongsTo(models.JUDICIAL_PROCEDURAL_WAY, {
            as: "judicialProceduralWay",
        });
        this.belongsTo(models.JUDICIAL_SEDE, { as: "judicialSede" });
        this.belongsTo(models.CUSTOMER_USER, { as: "customerUser" });
        this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
        this.belongsTo(models.JUDICIAL_PROCESS_REASON, { as: "processReason" });
        this.belongsTo(models.CITY, { as: "city" });
        this.belongsTo(models.BANK, { as: "bank" });
        this.hasMany(models.PRODUCT, {
            as: "product",
            foreignKey: "judicialCaseFileId",
        });
        this.belongsTo(models.JUDICIAL_CASE_FILE, {
            as: "relatedJudicialCaseFile",
            foreignKey: "idJudicialCaseFileRelated",
        });
        this.hasMany(models.JUDICIAL_BINNACLE, {
            as: "judicialBinnacle",
            foreignKey: "judicialFileCaseId",
        });
        this.hasMany(models.JUDICIAL_CASE_FILE_HAS_COLLATERAL, {
            as: "judicialCaseFileHasCollateral",
            foreignKey: "judicialCaseFileId",
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: JUDICIAL_CASE_FILE_TABLE,
            modelName: JUDICIAL_CASE_FILE_TABLE,
            timestamps: false,
        };
    }
}
exports.default = {
    JUDICIAL_CASE_FILE_TABLE,
    JudicialCaseFileSchema,
    JudicialCaseFile,
};

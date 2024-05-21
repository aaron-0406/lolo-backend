import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialCaseFileType } from "../../app/judicial/types/judicial-case-file.type";

import clientModel from "./client.model";
import judicialSedeModel from "./judicial-sede.model";
import judicialCourtModel from "./judicial-court.model";
import judicialProceduralWayModel from "./judicial-procedural-way.model";
import judicialSubjectModel from "./judicial-subject.model";
import judicialProcessReasonModel from "./judicial-process-reason.model";
import customerUserModel from "./customer-user.model";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_CASE_FILE_TABLE = "JUDICIAL_CASE_FILE";

const JudicialCaseFileSchema: ModelAttributes<
  JudicialCaseFile,
  JudicialCaseFileType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_judicial_case_file",
    type: DataTypes.INTEGER,
  },
  numberCaseFile: {
    allowNull: false,
    field: "number_case_file",
    type: DataTypes.STRING(150),
  },
  judgmentNumber: {
    allowNull: true,
    field: "judgment_number",
    type: DataTypes.INTEGER,
  },
  secretary: {
    allowNull: true,
    type: DataTypes.STRING(150),
  },
  amountDemandedSoles: {
    allowNull: true,
    field: "amount_demanded_soles",
    type: DataTypes.DECIMAL(10, 3),
  },
  amountDemandedDollars: {
    allowNull: true,
    field: "amount_demanded_dollars",
    type: DataTypes.DECIMAL(10, 3),
  },
  cautionaryCode: {
    allowNull: true,
    field: "cautionary_code",
    type: DataTypes.STRING(150),
  },
  errandCode: {
    allowNull: true,
    field: "errand_code",
    type: DataTypes.STRING(150),
  },
  judicialSedeId: {
    allowNull: true,
    field: "judicial_sede_id_judicial_sede",
    type: DataTypes.INTEGER,
    references: {
      model: judicialSedeModel.JUDICIAL_SEDE_TABLE,
      key: "id_judicial_sede",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  judge: {
    allowNull: true,
    type: DataTypes.STRING(150),
  },
  demandDate: {
    field: "demand_date",
    allowNull: true,
    type: DataTypes.DATE,
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  clientId: {
    allowNull: false,
    field: "client_id_client",
    type: DataTypes.INTEGER,
    references: {
      model: clientModel.CLIENT_TABLE,
      key: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  customerUserId: {
    allowNull: false,
    field: "customer_user_id_customer_user",
    type: DataTypes.INTEGER,
    references: {
      model: customerUserModel.CUSTOMER_USER_TABLE,
      key: "id_customer_user",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  judicialCourtId: {
    allowNull: false,
    field: "judicial_court_id_judicial_court",
    type: DataTypes.INTEGER,
    references: {
      model: judicialCourtModel.JUDICIAL_COURT_TABLE,
      key: "id_judicial_court",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  judicialSubjectId: {
    allowNull: false,
    field: "judicial_subject_id_judicial_subject",
    type: DataTypes.INTEGER,
    references: {
      model: judicialSubjectModel.JUDICIAL_SUBJECT_TABLE,
      key: "id_judicial_subject",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  judicialProceduralWayId: {
    allowNull: false,
    field: "judicial_procedural_way_id_judicial_procedural_way",
    type: DataTypes.INTEGER,
    references: {
      model: judicialProceduralWayModel.JUDICIAL_PROCEDURAL_WAY_TABLE,
      key: "id_judicial_procedural_way",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  customerHasBankId: {
    allowNull: false,
    field: "customer_has_bank_id",
    type: DataTypes.INTEGER,
    references: {
      model: customerHasBankModel.CUSTOMER_HAS_BANK_TABLE,
      key: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  processStatus: {
    allowNull: true,
    field: "process_status",
    type: DataTypes.STRING(150),
  },
  processComment: {
    allowNull: true,
    field: "process_comment",
    type: DataTypes.TEXT("long"),
  },
  processReasonId: {
    allowNull: true,
    field: "process_reason_id",
    type: DataTypes.INTEGER,
    references: {
      model: judicialProcessReasonModel.JUDICIAL_PROCESS_REASON_TABLE,
      key: "id_judicial_process_status_reason",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class JudicialCaseFile extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
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

    this.hasMany(models.PRODUCT, {
      as: "product",
      foreignKey: "judicialCaseFileId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_CASE_FILE_TABLE,
      modelName: JUDICIAL_CASE_FILE_TABLE,
      timestamps: false,
    };
  }
}

export default {
  JUDICIAL_CASE_FILE_TABLE,
  JudicialCaseFileSchema,
  JudicialCaseFile,
};

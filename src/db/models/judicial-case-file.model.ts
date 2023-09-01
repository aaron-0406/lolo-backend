import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialCaseFileType } from "../../app/judicial/types/judicial-case-file.type";
import clientModel from "./client.model";
import judicialCourtModel from "./judicial-court.model";
import judicialProceduralWayModel from "./judicial-procedural-way.model";
import judicialSubjectModel from "./judicial-subject.model";
import customerUserModel from "./customer-user.model";

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
    type: DataTypes.INTEGER,
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
  judicialVenue: {
    field: "judicial_venue",
    allowNull: true,
    type: DataTypes.STRING(150),
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
  },
  customerUserId: {
    allowNull: false,
    field: "customer_user_id_customer_user",
    type: DataTypes.INTEGER,
    references: {
      model: customerUserModel.CUSTOMER_USER_TABLE,
      key: "id_customer_user",
    },
  },
  judicialCourtId: {
    allowNull: false,
    field: "judicial_court_id_judicial_court",
    type: DataTypes.INTEGER,
    references: {
      model: judicialCourtModel.JUDICIAL_COURT_TABLE,
      key: "id_judicial_court",
    },
  },
  judicialSubjectId: {
    allowNull: false,
    field: "judicial_subject_id_judicial_subject",
    type: DataTypes.INTEGER,
    references: {
      model: judicialSubjectModel.JUDICIAL_SUBJECT_TABLE,
      key: "id_judicial_subject",
    },
  },
  judicialProceduralWayId: {
    allowNull: false,
    field: "judicial_procedural_way_id_judicial_procedural_way",
    type: DataTypes.INTEGER,
    references: {
      model: judicialProceduralWayModel.JUDICIAL_PROCEDURAL_WAY_TABLE,
      key: "id_judicial_procedural_way",
    },
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

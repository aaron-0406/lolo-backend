import { DataTypes, QueryInterface } from "sequelize";
import judicialCaseFileModel from "../models/judicial-case-file.model";
import judicialSubjectModel from "../models/judicial-subject.model";
import judicialCourtModel from "../models/judicial-court.model";
import judicialProceduralWayModel from "../models/judicial-procedural-way.model";
import clientModel from "../models/client.model";

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;
const { CLIENT_TABLE } = clientModel;
const { JUDICIAL_SUBJECT_TABLE } = judicialSubjectModel;
const { JUDICIAL_COURT_TABLE } = judicialCourtModel;
const { JUDICIAL_PROCEDURAL_WAY_TABLE } = judicialProceduralWayModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(JUDICIAL_SUBJECT_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_subject",
      type: DataTypes.INTEGER,
    },
    subject: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
  });
  await queryInterface.createTable(JUDICIAL_COURT_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_court",
      type: DataTypes.INTEGER,
    },
    court: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
  });
  await queryInterface.createTable(JUDICIAL_PROCEDURAL_WAY_TABLE, {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_procedural_way",
      type: DataTypes.INTEGER,
    },
    proceduralWay: {
      allowNull: false,
      field: "procedural_way",
      type: DataTypes.STRING(150),
    },
  });
  await queryInterface.createTable(JUDICIAL_CASE_FILE_TABLE, {
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
        model: CLIENT_TABLE,
        key: "id_client",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    judicialCourtId: {
      allowNull: false,
      field: "judicial_court_id_judicial_court",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_COURT_TABLE,
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
        model: JUDICIAL_SUBJECT_TABLE,
        key: "id_judicial_subject",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
    judicialProceduralWayId: {
      allowNull: false,
      field: "judicial_procedure_way_id_judicial_procedure_way",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_PROCEDURAL_WAY_TABLE,
        key: "id_judicial_procedure_way",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
  });
  await queryInterface.addConstraint(JUDICIAL_CASE_FILE_TABLE, {
    fields: ["client_id_client"],
    type: "foreign key",
    name: "fk_client_id_client",
    references: {
      table: CLIENT_TABLE,
      field: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addConstraint(JUDICIAL_CASE_FILE_TABLE, {
    fields: ["judicial_court_id_judicial_court"],
    type: "foreign key",
    name: "fk_judicial_court_id_judicial_court",
    references: {
      table: JUDICIAL_COURT_TABLE,
      field: "id_judicial_court",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addConstraint(JUDICIAL_CASE_FILE_TABLE, {
    fields: ["judicial_subject_id_judicial_subject"],
    type: "foreign key",
    name: "fk_judicial_subject_id_judicial_subject",
    references: {
      table: JUDICIAL_SUBJECT_TABLE,
      field: "id_judicial_subject",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addConstraint(JUDICIAL_CASE_FILE_TABLE, {
    fields: ["judicial_procedural_way_id_judicial_procedural_way"],
    type: "foreign key",
    name: "fk_judicial_procedural_way_id_judicial_procedural_way",
    references: {
      table: JUDICIAL_PROCEDURAL_WAY_TABLE,
      field: "id_judicial_procedural_way",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeConstraint(
    JUDICIAL_CASE_FILE_TABLE,
    "fk_client_id_client"
  );
  await queryInterface.removeConstraint(
    JUDICIAL_CASE_FILE_TABLE,
    "fk_judicial_court_id_judicial_court"
  );
  await queryInterface.removeConstraint(
    JUDICIAL_CASE_FILE_TABLE,
    "fk_judicial_subject_id_judicial_subject"
  );
  await queryInterface.removeConstraint(
    JUDICIAL_CASE_FILE_TABLE,
    "fk_judicial_procedural_way_id_judicial_procedural_way"
  );
  await queryInterface.dropTable(JUDICIAL_SUBJECT_TABLE);
  await queryInterface.dropTable(JUDICIAL_PROCEDURAL_WAY_TABLE);
  await queryInterface.dropTable(JUDICIAL_COURT_TABLE);
  await queryInterface.dropTable(JUDICIAL_CASE_FILE_TABLE);
}

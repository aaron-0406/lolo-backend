import { DataTypes, QueryInterface } from "sequelize";
import judicialCaseFileModel from "../models/judicial-case-file.model";
import judicialSubjectModel from "../models/judicial-subject.model";
import judicialCourtModel from "../models/judicial-court.model";
import judicialProceduralWayModel from "../models/judicial-procedural-way.model";
import clientModel from "../models/client.model";
import customerUserModel from "../models/customer-user.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";

const { JUDICIAL_CASE_FILE_TABLE } = judicialCaseFileModel;
const { CLIENT_TABLE } = clientModel;
const { CUSTOMER_USER_TABLE } = customerUserModel;
const { JUDICIAL_SUBJECT_TABLE } = judicialSubjectModel;
const { JUDICIAL_COURT_TABLE } = judicialCourtModel;
const { JUDICIAL_PROCEDURAL_WAY_TABLE } = judicialProceduralWayModel;
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

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
    customerHasBankId: {
      allowNull: false,
      field: "customer_has_bank_id_customer_has_bank",
      type: DataTypes.INTEGER,
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
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
    customerHasBankId: {
      allowNull: false,
      field: "customer_has_bank_id_customer_has_bank",
      type: DataTypes.INTEGER,
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
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
    customerHasBankId: {
      allowNull: false,
      field: "customer_has_bank_id_customer_has_bank",
      type: DataTypes.INTEGER,
      references: {
        model: CUSTOMER_HAS_BANK_TABLE,
        key: "id_customer_has_bank",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
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
        model: CLIENT_TABLE,
        key: "id_client",
      },
    },
    customerUserId: {
      allowNull: false,
      field: "customer_user_id_customer_user",
      type: DataTypes.INTEGER,
      references: {
        model: CUSTOMER_USER_TABLE,
        key: "id_customer_user",
      },
    },
    judicialCourtId: {
      allowNull: false,
      field: "judicial_court_id_judicial_court",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_COURT_TABLE,
        key: "id_judicial_court",
      },
    },
    judicialSubjectId: {
      allowNull: false,
      field: "judicial_subject_id_judicial_subject",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_SUBJECT_TABLE,
        key: "id_judicial_subject",
      },
    },
    judicialProceduralWayId: {
      allowNull: false,
      field: "judicial_procedural_way_id_judicial_procedural_way",
      type: DataTypes.INTEGER,
      references: {
        model: JUDICIAL_PROCEDURAL_WAY_TABLE,
        key: "id_judicial_procedural_way",
      },
    },
  });
  await queryInterface.addConstraint(JUDICIAL_CASE_FILE_TABLE, {
    fields: ["client_id_client"],
    type: "foreign key",
    name: "fk_judicial_case_file_client",
    references: {
      table: CLIENT_TABLE,
      field: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addConstraint(JUDICIAL_CASE_FILE_TABLE, {
    fields: ["customer_user_id_customer_user"],
    type: "foreign key",
    name: "fk_judicial_case_file_customer_user",
    references: {
      table: CUSTOMER_USER_TABLE,
      field: "id_customer_user",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addConstraint(JUDICIAL_CASE_FILE_TABLE, {
    fields: ["judicial_court_id_judicial_court"],
    type: "foreign key",
    name: "fk_judicial_court_judicial_case_file",
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
    name: "fk_judicial_subject_judicial_case_file",
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
    name: "fk_judicial_procedural_way_judicial_case_file",
    references: {
      table: JUDICIAL_PROCEDURAL_WAY_TABLE,
      field: "id_judicial_procedural_way",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.addConstraint(JUDICIAL_PROCEDURAL_WAY_TABLE, {
    fields: ["customer_has_bank_id_customer_has_bank"],
    type: "foreign key",
    name: "fk_judicial_procedural_way_customer_has_bank",
    references: {
      table: CUSTOMER_HAS_BANK_TABLE,
      field: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addConstraint(JUDICIAL_COURT_TABLE, {
    fields: ["customer_has_bank_id_customer_has_bank"],
    type: "foreign key",
    name: "fk_judicial_court_customer_has_bank",
    references: {
      table: CUSTOMER_HAS_BANK_TABLE,
      field: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
  await queryInterface.addConstraint(JUDICIAL_SUBJECT_TABLE, {
    fields: ["customer_has_bank_id_customer_has_bank"],
    type: "foreign key",
    name: "fk_judicial_subject_customer_has_bank",
    references: {
      table: CUSTOMER_HAS_BANK_TABLE,
      field: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeConstraint(
    JUDICIAL_CASE_FILE_TABLE,
    "fk_judicial_case_file_client"
  );
  await queryInterface.removeConstraint(
    JUDICIAL_CASE_FILE_TABLE,
    "fk_judicial_case_file_customer_user"
  );
  await queryInterface.removeConstraint(
    JUDICIAL_CASE_FILE_TABLE,
    "fk_judicial_court_judicial_case_file"
  );
  await queryInterface.removeConstraint(
    JUDICIAL_CASE_FILE_TABLE,
    "fk_judicial_subject_judicial_case_file"
  );
  await queryInterface.removeConstraint(
    JUDICIAL_CASE_FILE_TABLE,
    "fk_judicial_subject_judicial_case_file"
  );
  await queryInterface.removeConstraint(
    JUDICIAL_SUBJECT_TABLE,
    "fk_judicial_subject_customer_has_bank"
  );
  await queryInterface.removeConstraint(
    JUDICIAL_COURT_TABLE,
    "fk_judicial_court_customer_has_bank"
  );
  await queryInterface.removeConstraint(
    JUDICIAL_PROCEDURAL_WAY_TABLE,
    "fk_judicial_procedural_way_customer_has_bank"
  );
  await queryInterface.dropTable(JUDICIAL_SUBJECT_TABLE);
  await queryInterface.dropTable(JUDICIAL_PROCEDURAL_WAY_TABLE);
  await queryInterface.dropTable(JUDICIAL_COURT_TABLE);
  await queryInterface.dropTable(JUDICIAL_CASE_FILE_TABLE);
}

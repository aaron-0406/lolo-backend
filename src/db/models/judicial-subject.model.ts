import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialSubjectType } from "../../app/judicial/types/judicial-subject.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_SUBJECT_TABLE = "JUDICIAL_SUBJECT";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialSubjectSchema: ModelAttributes<
  JudicialSubject,
  JudicialSubjectType
> = {
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
};

class JudicialSubject extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_SUBJECT_TABLE,
      modelName: JUDICIAL_SUBJECT_TABLE,
      timestamps: false,
    };
  }
}

export default {
  JUDICIAL_SUBJECT_TABLE,
  JudicialSubjectSchema,
  JudicialSubject,
};

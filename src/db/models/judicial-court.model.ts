import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialCourtType } from "../../app/judicial/types/judicial-court.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const JUDICIAL_COURT_TABLE = "JUDICIAL_COURT";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JudicialCourtSchema: ModelAttributes<JudicialCourt, JudicialCourtType> = {
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
};

class JudicialCourt extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_COURT_TABLE,
      modelName: JUDICIAL_COURT_TABLE,
      timestamps: false,
    };
  }
}

export default { JUDICIAL_COURT_TABLE, JudicialCourtSchema, JudicialCourt };

import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialProceduralWayType } from "../../app/judicial/types/judicial-procedural-way.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

const JUDICIAL_PROCEDURAL_WAY_TABLE = "JUDICIAL_PROCEDURAL_WAY";

const JudicialProceduralWaySchema: ModelAttributes<
  JudicialProceduralWay,
  JudicialProceduralWayType
> = {
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
};

class JudicialProceduralWay extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: JUDICIAL_PROCEDURAL_WAY_TABLE,
      modelName: JUDICIAL_PROCEDURAL_WAY_TABLE,
      timestamps: false,
    };
  }
}

export default {
  JUDICIAL_PROCEDURAL_WAY_TABLE,
  JudicialProceduralWaySchema,
  JudicialProceduralWay,
};

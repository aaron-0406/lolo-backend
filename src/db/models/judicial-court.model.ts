import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { JudicialCourtType } from "../../app/judicial/types/judicial-court.type";

const JUDICIAL_COURT_TABLE = "JUDICIAL_COURT";

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
};

class JudicialCourt extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {}

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

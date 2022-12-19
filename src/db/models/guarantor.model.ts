import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
import { GuarantorType } from "../../app/extrajudicial/types/guarantor.type";

const GUARANTOR_TABLE = "GUARANTOR";

const GuarantorSchema: ModelAttributes<Guarantor, GuarantorType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_guarantor",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
};

class Guarantor extends Model {
  static associate() {
    //associate
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: GUARANTOR_TABLE,
      modelName: GUARANTOR_TABLE,
      timestamps: false,
    };
  }
}

export default { GUARANTOR_TABLE, GuarantorSchema, Guarantor };

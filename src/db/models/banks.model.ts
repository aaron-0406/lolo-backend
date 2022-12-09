import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
import { BankType } from "../../app/boss/types/banks.type";

const BANK_TABLE = "BANK";

const BankSchema: ModelAttributes<Bank, BankType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_bank",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    field: "name",
    type: DataTypes.STRING(100),
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT("tiny"),
  },
  createAt: {
    allowNull: false,
    field: "create_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
};

class Bank extends Model {
  static associate() {
    //associate
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: BANK_TABLE,
      modelName: BANK_TABLE,
      timestamps: false,
    };
  }
}

export default { BANK_TABLE, BankSchema, Bank };

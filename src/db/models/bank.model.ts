import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { BankType } from "../../app/dash/types/bank.type";

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
  state: {
    allowNull: false,
    type: DataTypes.TINYINT({ length: 1 }),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
};

class Bank extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.hasMany(models.FUNCIONARIO, {
      as: "funcionario",
      foreignKey: "bankId",
    });
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

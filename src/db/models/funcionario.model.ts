import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { FuncionarioType } from "../../app/boss/types/funcionario.type";
import bankModel from "./bank.model";

const FUNCIONARIO_TABLE = "FUNCIONARIO";

const FuncionarioSchema: ModelAttributes<Funcionario, FuncionarioType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_funcionario",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    field: "name",
    type: DataTypes.STRING(150),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  bankId: {
    allowNull: false,
    field: "bank_id_bank",
    type: DataTypes.INTEGER,
    references: {
      model: bankModel.BANK_TABLE,
      key: "id_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class Funcionario extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.BANK, { as: "bank" });

    this.hasMany(models.CLIENT, {
      as: "client",
      foreignKey: "funcionarioID",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: FUNCIONARIO_TABLE,
      modelName: FUNCIONARIO_TABLE,
      timestamps: false,
    };
  }
}

export default { FUNCIONARIO_TABLE, FuncionarioSchema, Funcionario };

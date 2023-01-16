import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { FuncionarioType } from "../../app/boss/types/funcionario.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const FUNCIONARIO_TABLE = "FUNCIONARIO";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

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

class Funcionario extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    this.hasMany(models.CLIENT, {
      as: "client",
      foreignKey: "funcionarioId",
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

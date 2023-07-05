import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { GoalType } from "../../app/extrajudicial/types/goal.type";
import customerModel from "./customer.model";

const GOAL_TABLE = "GOAL";
const { CUSTOMER_TABLE } = customerModel;

const GoalSchema: ModelAttributes<Goal, GoalType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_goal",
    type: DataTypes.INTEGER,
  },
  startDate: {
    allowNull: false,
    field: "start_date",
    type: DataTypes.DATE,
  },
  week: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  endDate: {
    field: "end_date",
    allowNull: true,
    type: DataTypes.DATE,
  },
  customerId: {
    allowNull: false,
    field: "customer_id_customer",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
};

class Goal extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {}
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: GOAL_TABLE,
      modelName: GOAL_TABLE,
      timestamps: false,
    };
  }
}

export default { GOAL_TABLE, GoalSchema, Goal };

import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { GoalUserType } from "../../app/extrajudicial/types/goal-user.type";
import goalModel from "./goal.model";
import customerUserModel from "./customer-user.model";
const { GOAL_TABLE } = goalModel;
const { CUSTOMER_USER_TABLE } = customerUserModel;

const GOAL_USER_TABLE = "GOAL_USER";

const GoalUserSchema: ModelAttributes<GoalUser, GoalUserType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_goal_user",
    type: DataTypes.INTEGER,
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  goalId: {
    allowNull: false,
    field: "goal_id_goal",
    type: DataTypes.INTEGER,
    references: {
      model: GOAL_TABLE,
      key: "id_goal",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  customerUserId: {
    allowNull: false,
    field: "customer_user_id_customer_user",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_USER_TABLE,
      key: "id_customer_user",
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

class GoalUser extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_USER, { as: "customerUser" });
    this.belongsTo(models.GOAL, { as: "goal" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: GOAL_USER_TABLE,
      modelName: GOAL_USER_TABLE,
      timestamps: false,
    };
  }
}

export default { GOAL_USER_TABLE, GoalUserSchema, GoalUser };

import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelStatic,
} from "sequelize";
import { UserLogType } from "../../app/dash/types/user-log.type";
import customerUserModel from "./customer-user.model";
import customerModel from "./customer.model";

const USER_LOG_TABLE = "USER_LOG";

const UserLogSchema: ModelAttributes<UserLog, UserLogType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_user_log",
    type: DataTypes.INTEGER,
  },
  codeAction: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  entityId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  entity: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  ip: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  createAt: {
    allowNull: false,
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  customerUserId: {
    allowNull: false,
    field: "customer_user_id_customer_user",
    type: DataTypes.INTEGER,
    references: {
      model: customerUserModel.CUSTOMER_USER_TABLE,
      key: "id_customer_user",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  customerId: {
    allowNull: false,
    field: "customer_id_customer",
    type: DataTypes.INTEGER,
    references: {
      model: customerModel.CUSTOMER_TABLE,
      key: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class UserLog extends Model {
  static associate(models: { [key: string]: ModelStatic<Model> }) {
    //associate
    this.belongsTo(models.CUSTOMER_USER, { as: "customerUser" });
    this.belongsTo(models.CUSTOMER, { as: "customer" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_LOG_TABLE,
      modelName: USER_LOG_TABLE,
      timestamps: false,
    };
  }
}

export default { USER_LOG_TABLE, UserLogSchema, UserLog };

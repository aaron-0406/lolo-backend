import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
import { UserAppType } from "../../app/boss/types/user-app";

const USER_APP_TABLE = "USER_APP";

const UserAppSchema: ModelAttributes<UserApp, UserAppType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_user_app",
    type: DataTypes.INTEGER,
  },
  code: {
    allowNull: false,
    type: DataTypes.STRING(9),
  },
  dni: {
    allowNull: false,
    type: DataTypes.STRING(8),
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  lastName: {
    allowNull: false,
    field: "last_name",
    type: DataTypes.STRING(100),
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(70),
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(70),
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

class UserApp extends Model {
  static associate() {
    //associate
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: USER_APP_TABLE,
      modelName: USER_APP_TABLE,
      timestamps: false,
    };
  }
}

export default { USER_APP_TABLE, UserAppSchema, UserApp };

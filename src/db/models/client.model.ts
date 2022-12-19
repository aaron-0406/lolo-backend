import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
import { ClientType } from "../../app/extrajudicial/types/client.type";

const CLIENT_TABLE = "CLIENT";

const ClientSchema: ModelAttributes<Client, ClientType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_city",
    type: DataTypes.INTEGER,
  },
  code: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
};

class Client extends Model {
  static associate() {
    //associate
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: CLIENT_TABLE,
      timestamps: false,
    };
  }
}

export default { CLIENT_TABLE, ClientSchema, Client };

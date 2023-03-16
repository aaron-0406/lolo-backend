import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { DirectionType } from "../../app/extrajudicial/types/direction.type";
import clientModel from "./client.model";

const DIRECTION_TABLE = "DIRECTION";

const DirectionSchema: ModelAttributes<Direction, DirectionType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_direction",
    type: DataTypes.INTEGER,
  },
  direction: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  clientId: {
    allowNull: false,
    field: "client_id_client",
    type: DataTypes.INTEGER,
    references: {
      model: clientModel.CLIENT_TABLE,
      key: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

class Direction extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CLIENT, { as: "client" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: DIRECTION_TABLE,
      modelName: DIRECTION_TABLE,
      timestamps: false,
    };
  }
}

export default { DIRECTION_TABLE, DirectionSchema, Direction };

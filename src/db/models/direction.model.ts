import { Model, DataTypes, Sequelize, ModelAttributes } from "sequelize";
import { DirectionType } from "../../app/extrajudicial/types/direction.type";

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
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
};

class Direction extends Model {
  static associate() {
    //associate
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

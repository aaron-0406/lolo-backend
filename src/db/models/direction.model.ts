import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { DirectionType } from "../../app/extrajudicial/types/direction.type";
import clientModel from "./client.model";
import extAddressTypeModel from "./ext-address-type.model";

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
  clientId: {
    allowNull: false,
    field: "client_id_client",
    type: DataTypes.INTEGER,
    references: {
      model: clientModel.CLIENT_TABLE,
      key: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  addressTypeId: {
    allowNull: true,
    field: "address_type_id_address_type",
    type: DataTypes.INTEGER,
    references: {
      model: extAddressTypeModel.EXT_ADDRESS_TYPE_TABLE,
      key: "id_address_type",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class Direction extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CLIENT, { as: "client" });
    this.belongsTo(models.EXT_ADDRESS_TYPE, { as: "addressType" });
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

import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { FileType } from "../../app/dash/types/file.type";
import clientModel from "./client.model";

const FILE_TABLE = "FILE";

const FileSchema: ModelAttributes<File, FileType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_file",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    field: "name",
    type: DataTypes.STRING(100),
  },
  originalName: {
    allowNull: false,
    field: "originalname",
    type: DataTypes.STRING(100),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  clientId: {
    allowNull: false,
    field: "id_client",
    type: DataTypes.INTEGER,
    references: {
      model: clientModel.CLIENT_TABLE,
      key: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

class File extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CLIENT, {
      as: "client",
      foreignKey: "clientId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: FILE_TABLE,
      modelName: FILE_TABLE,
      timestamps: false,
    };
  }
}

export default { FILE_TABLE, FileSchema, File };

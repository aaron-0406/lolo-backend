import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import clientModel from "./client.model";
import extTagModel from "./ext-tag.model";
import { FileType } from "../../app/extrajudicial/types/file.type";

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
    type: DataTypes.TEXT("long"),
  },
  originalName: {
    allowNull: false,
    field: "originalname",
    type: DataTypes.TEXT("long"),
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
    onDelete: "NO ACTION",
  },
  tagId: {
    allowNull: true,
    field: "tag_id",
    type: DataTypes.INTEGER,
    references: {
      model: extTagModel.EXT_TAG_TABLE,
      key: "id_ext_tag",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class File extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CLIENT, {
      as: "client",
      foreignKey: "clientId",
    });

    this.belongsTo(models.EXT_TAG, {
      as: "classificationTag",
      foreignKey: "tagId",
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

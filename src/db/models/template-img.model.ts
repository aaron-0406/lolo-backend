import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { TemplateImgType } from "../../app/extrajudicial/types/template-img.type";
import templateModel from "./template.model";

const TEMPLATE_IMG_TABLE = "TEMPLATE_IMG";

const TemplateImgSchema: ModelAttributes<TemplateImg, TemplateImgType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_template_img",
    type: DataTypes.INTEGER,
  },
  img: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  size: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  templateId: {
    allowNull: false,
    field: "template_id_template",
    type: DataTypes.INTEGER,
    references: {
      model: templateModel.TEMPLATE_TABLE,
      key: "id_template",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

class TemplateImg extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.TEMPLATE, {
      as: "template",
      foreignKey: "templateId",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TEMPLATE_IMG_TABLE,
      modelName: TEMPLATE_IMG_TABLE,
      timestamps: false,
    };
  }
}

export default {
  TEMPLATE_IMG_TABLE,
  TemplateImgSchema,
  TemplateImg,
};

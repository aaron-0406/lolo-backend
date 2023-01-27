import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { TemplateHasValuesType } from "../../../app/customers/types/template-has-values.type";
import templateModel from "../template.model";

const TEMPLATE_HAS_VALUES_TABLE = "TEMPLATE_HAS_VALUES";

const TemplateHasValuesSchema: ModelAttributes<
  TemplateHasValues,
  TemplateHasValuesType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_template_has_values",
    type: DataTypes.INTEGER,
  },
  name: {
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

class TemplateHasValues extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.TEMPLATE, {
      as: "template",
      foreignKey: "templateId",
      targetKey: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    this.hasMany(models.VALUES, {
      as: "values",
      foreignKey: "templateHasValuesId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TEMPLATE_HAS_VALUES_TABLE,
      modelName: TEMPLATE_HAS_VALUES_TABLE,
      timestamps: false,
    };
  }
}

export default {
  TEMPLATE_HAS_VALUES_TABLE,
  TemplateHasValuesSchema,
  TemplateHasValues,
};

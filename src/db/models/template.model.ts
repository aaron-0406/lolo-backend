import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { TemplateType } from "../../app/extrajudicial/types/template.type";
import customerModel from "./customer.model";

const TEMPLATE_TABLE = "TEMPLATE";

const TemplateSchema: ModelAttributes<Template, TemplateType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_template",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  templateJson: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  templatePhoto: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
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

class Template extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER, { as: "customer" });
    this.hasMany(models.TEMPLATE_HAS_VALUES, {
      as: "template_has_values",
      foreignKey: "templateId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    this.hasMany(models.TEMPLATE_IMG, {
      as: "template_imgs",
      foreignKey: "templateId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TEMPLATE_TABLE,
      modelName: TEMPLATE_TABLE,
      timestamps: false,
    };
  }
}

export default { TEMPLATE_TABLE, TemplateSchema, Template };

import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ValuesType } from "../../app/extrajudicial/types/values.type";
import templateHasValuesModel from "./many-to-many/template-has-values.model";
import ecampoModel from "./ecampo.model";

const VALUES_TABLE = "VALUES";

const ValuesSchema: ModelAttributes<Values, ValuesType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_value",
    type: DataTypes.INTEGER,
  },
  field: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  value: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  templateHasValuesId: {
    allowNull: false,
    field: "template_has_values_id_template_has_values",
    type: DataTypes.INTEGER,
    references: {
      model: templateHasValuesModel.TEMPLATE_HAS_VALUES_TABLE,
      key: "id_template_has_values",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  ecampoId: {
    allowNull: false,
    field: "ecampo_id_ecampo",
    type: DataTypes.INTEGER,
    references: {
      model: ecampoModel.ECAMPO_TABLE,
      key: "id_ecampo",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
};

class Values extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.ECAMPO, { as: "ecampo" });
    this.belongsTo(models.TEMPLATE_HAS_VALUES, { as: "template_has_values" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: VALUES_TABLE,
      modelName: VALUES_TABLE,
      timestamps: false,
    };
  }
}

export default { VALUES_TABLE, ValuesSchema, Values };

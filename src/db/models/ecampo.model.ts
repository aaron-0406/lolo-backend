import {
    Model,
    DataTypes,
    Sequelize,
    ModelAttributes,
    ModelCtor,
  } from "sequelize";
  import { ECampoType } from "../../app/customers/types/ecampo.type";
  import templateModel from "./template.model";
  
  const ECAMPO_TABLE = "ECAMPO";
  
  const ECampoSchema: ModelAttributes<ECampo, ECampoType> = {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_ecampo",
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
    field: {
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
  
  class ECampo extends Model {
    static associate(models: { [key: string]: ModelCtor<Model> }) {
      this.belongsTo(models.TEMPLATE, { as: "template" });
    }
  
    static config(sequelize: Sequelize) {
      return {
        sequelize,
        tableName: ECAMPO_TABLE,
        modelName: ECAMPO_TABLE,
        timestamps: false,
      };
    }
  }
  
  export default { ECAMPO_TABLE, ECampoSchema, ECampo };
  
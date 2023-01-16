import {
    Model,
    DataTypes,
    Sequelize,
    ModelAttributes,
    ModelCtor,
  } from "sequelize";
  import { NegotiationType } from "../../app/boss/types/negotiation.type";
  
  const NEGOTIATION_TABLE = "NEGOTIATION";
  
  const NegotiationSchema: ModelAttributes<Negotiation, NegotiationType> = {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_negotiation",
      type: DataTypes.INTEGER,
    },
    name: {
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
  
  class Negotiation extends Model {
  
    static config(sequelize: Sequelize) {
      return {
        sequelize,
        tableName: NEGOTIATION_TABLE,
        modelName: NEGOTIATION_TABLE,
        timestamps: false,
      };
    }
  }
  
  export default { NEGOTIATION_TABLE, NegotiationSchema, Negotiation };
  
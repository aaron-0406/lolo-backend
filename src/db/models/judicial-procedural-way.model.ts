import {
    Model,
    DataTypes,
    Sequelize,
    ModelAttributes,
    ModelCtor,
  } from "sequelize";
  import { JudicialProceduralWayType } from "../../app/judicial/types/judicial-procedural-way.type";
  
  const JUDICIAL_PROCEDURAL_WAY_TABLE = "JUDICIAL_PROCEDURAL_WAY";
  
  const JudicialProceduralWaySchema: ModelAttributes<JudicialProceduralWay, JudicialProceduralWayType> = {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_procedural_way",
      type: DataTypes.INTEGER,
    },
    proceduralWay: {
      allowNull: false,
      field: "procedural_way",
      type: DataTypes.STRING(150),
    },
  };
  
  class JudicialProceduralWay extends Model {
    static associate(models: { [key: string]: ModelCtor<Model> }) {}
  
    static config(sequelize: Sequelize) {
      return {
        sequelize,
        tableName: JUDICIAL_PROCEDURAL_WAY_TABLE,
        modelName: JUDICIAL_PROCEDURAL_WAY_TABLE,
        timestamps: false,
      };
    }
  }
  
  export default { JUDICIAL_PROCEDURAL_WAY_TABLE, JudicialProceduralWaySchema, JudicialProceduralWay };
  
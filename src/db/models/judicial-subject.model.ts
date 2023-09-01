import {
    Model,
    DataTypes,
    Sequelize,
    ModelAttributes,
    ModelCtor,
  } from "sequelize";
  import { JudicialSubjectType } from "../../app/judicial/types/judicial-subject.type";
  
  const JUDICIAL_SUBJECT_TABLE = "JUDICIAL_SUBJECT";
  
  const JudicialSubjectSchema: ModelAttributes<JudicialSubject, JudicialSubjectType> = {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: "id_judicial_subject",
      type: DataTypes.INTEGER,
    },
    subject: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
  };
  
  class JudicialSubject extends Model {
    static associate(models: { [key: string]: ModelCtor<Model> }) {}
  
    static config(sequelize: Sequelize) {
      return {
        sequelize,
        tableName: JUDICIAL_SUBJECT_TABLE,
        modelName: JUDICIAL_SUBJECT_TABLE,
        timestamps: false,
      };
    }
  }
  
  export default { JUDICIAL_SUBJECT_TABLE, JudicialSubjectSchema, JudicialSubject };
  
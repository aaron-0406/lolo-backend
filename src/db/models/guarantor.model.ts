import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { GuarantorType } from "../../app/extrajudicial/types/guarantor.type";
import clientModel from "./client.model";

const GUARANTOR_TABLE = "GUARANTOR";

const GuarantorSchema: ModelAttributes<Guarantor, GuarantorType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_guarantor",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  clientId: {
    allowNull: false,
    field: "client_id_client",
    type: DataTypes.INTEGER,
    references: {
      model: clientModel.CLIENT_TABLE,
      key: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class Guarantor extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CLIENT, { as: "client" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: GUARANTOR_TABLE,
      modelName: GUARANTOR_TABLE,
      timestamps: false,
    };
  }
}

export default { GUARANTOR_TABLE, GuarantorSchema, Guarantor };

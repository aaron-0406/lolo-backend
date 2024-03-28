import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { NegotiationType } from "../../app/dash/types/negotiation.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const NEGOTIATION_TABLE = "NEGOTIATION";
const { CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;

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
  customerHasBankId: {
    allowNull: false,
    field: "customer_has_bank_id_customer_has_bank",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_HAS_BANK_TABLE,
      key: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class Negotiation extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });
    
    this.hasMany(models.CLIENT, {
      as: "client",
      foreignKey: "negotiationId",
    });

    this.hasMany(models.PRODUCT, {
      as: "product",
      foreignKey: "negotiationId",
    });
  }

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

import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { CustomerHasBankType } from "../../../app/dash/types/customer-has-bank";
import customerModel from "../customer.model";
import bankModel from "../bank.model";

const { BANK_TABLE } = bankModel;
const { CUSTOMER_TABLE } = customerModel;
const CUSTOMER_HAS_BANK_TABLE = "CUSTOMER_HAS_BANK";

const CustomerHasBankSchema: ModelAttributes<
  CustomerHasBank,
  CustomerHasBankType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_customer_has_bank",
    type: DataTypes.INTEGER,
  },
  idCustomer: {
    allowNull: false,
    field: "customer_id_customer",
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  idBank: {
    allowNull: false,
    field: "bank_id_bank",
    type: DataTypes.INTEGER,
    references: {
      model: BANK_TABLE,
      key: "id_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
};

class CustomerHasBank extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.hasMany(models.CLIENT, {
      as: "client",
      foreignKey: "customerHasBankId",
    });

    this.hasMany(models.MANAGEMENT_ACTION, {
      as: "managementAction",
      foreignKey: "customerHasBankId",
    });

    this.hasMany(models.NEGOTIATION, {
      as: "negotiation",
      foreignKey: "customerHasBankId",
    });

    this.hasMany(models.EXT_CONTACT_TYPE, {
      as: "extContactType",
      foreignKey: "customerHasBankId",
    });

    this.hasMany(models.EXT_PRODUCT_NAME, {
      as: "extProductName",
      foreignKey: "customerHasBankId",
    });

    this.belongsTo(models.BANK, { as: "bank", foreignKey: "idBank" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_HAS_BANK_TABLE,
      modelName: CUSTOMER_HAS_BANK_TABLE,
      timestamps: false,
    };
  }
}

export default {
  CUSTOMER_HAS_BANK_TABLE,
  CustomerHasBankSchema,
  CustomerHasBank,
};

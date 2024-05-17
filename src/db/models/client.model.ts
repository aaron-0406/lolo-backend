import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ClientType } from "../../app/extrajudicial/types/client.type";
import cityModel from "./city.model";
import funcionarioModel from "./funcionario.model";
import customerUserModel from "./customer-user.model";
import negotiationModel from "./negotiation.model";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const CLIENT_TABLE = "CLIENT";

const ClientSchema: ModelAttributes<Client, ClientType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_client",
    type: DataTypes.INTEGER,
  },
  code: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(150),
  },
  negotiationId: {
    allowNull: false,
    field: "negotiation_id_negotiation",
    type: DataTypes.INTEGER,
    references: {
      model: negotiationModel.NEGOTIATION_TABLE,
      key: "id_negotiation",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  dniOrRuc: {
    allowNull: true,
    type: DataTypes.STRING(20),
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  salePerimeter: {
    allowNull: true,
    type: DataTypes.TEXT("tiny"),
  },
  phone: {
    allowNull: true,
    type: DataTypes.TEXT("tiny"),
  },
  email: {
    allowNull: true,
    type: DataTypes.TEXT("tiny"),
  },
  chbTransferred: {
    allowNull: true,
    field: "chb_transferred",
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  cityId: {
    allowNull: false,
    field: "city_id_city",
    type: DataTypes.INTEGER,
    references: {
      model: cityModel.CITY_TABLE,
      key: "id_city",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  funcionarioId: {
    allowNull: false,
    field: "funcionario_id_funcionario",
    type: DataTypes.INTEGER,
    references: {
      model: funcionarioModel.FUNCIONARIO_TABLE,
      key: "id_funcionario",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  customerUserId: {
    allowNull: false,
    field: "customer_user_id_customer_user",
    type: DataTypes.INTEGER,
    references: {
      model: customerUserModel.CUSTOMER_USER_TABLE,
      key: "id_customer_user",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
  customerHasBankId: {
    allowNull: false,
    field: "customer_has_bank_id_customer_has_bank",
    type: DataTypes.INTEGER,
    references: {
      model: customerHasBankModel.CUSTOMER_HAS_BANK_TABLE,
      key: "id_customer_has_bank",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  },
};

class Client extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CITY, { as: "city" });

    this.belongsTo(models.FUNCIONARIO, { as: "funcionario" });

    this.belongsTo(models.NEGOTIATION, { as: "negotiation" });

    this.belongsTo(models.CUSTOMER_USER, { as: "customerUser" });

    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });

    this.hasMany(models.COMMENT, {
      as: "comment",
      foreignKey: "clientId",
    });

    this.hasMany(models.EXT_CONTACT, {
      as: "extContacts",
      foreignKey: "clientId",
    });

    this.hasMany(models.FILE, {
      as: "files",
      foreignKey: "clientId",
    });

    // this.hasMany(models.GUARANTOR, {
    //   as: "guarantor",
    //   foreignKey: "clientId",
    // });

    this.hasMany(models.DIRECTION, {
      as: "direction",
      foreignKey: "clientId",
    });

    this.hasMany(models.PRODUCT, {
      as: "product",
      foreignKey: "clientId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: CLIENT_TABLE,
      timestamps: false,
    };
  }
}

export default { CLIENT_TABLE, ClientSchema, Client };

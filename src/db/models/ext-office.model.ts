import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ExtOfficeType } from "../../app/extrajudicial/types/ext-office.type";
import customerModel from "./customer.model";
import cityModel from "./city.model";

const EXT_OFFICE_TABLE = "EXT_OFFICE";

const ExtOfficeSchema: ModelAttributes<ExtOffice, ExtOfficeType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_ext_office",
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  address: {
    allowNull: true,
    type: DataTypes.STRING(200),
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
  state: {
    allowNull: false,
    type: DataTypes.TINYINT({ length: 1 }),
  },
  createdAt: {
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    field: "updated_at",
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
  },
  deletedAt: {
    allowNull: true,
    field: "deleted_at",
    type: DataTypes.DATE,
  },
};

class ExtOffice extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER, { as: "customer" });
    this.belongsTo(models.CITY, { as: "city" });

    this.hasMany(models.EXT_IP_ADDRESS_BANK, {
      as: "extIpAddressBank",
      foreignKey: "officeId",
    });
    this.hasMany(models.CUSTOMER_USER, {
      as: "customerUser",
      foreignKey: "officeId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: EXT_OFFICE_TABLE,
      modelName: EXT_OFFICE_TABLE,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
    };
  }
}

export default { EXT_OFFICE_TABLE, ExtOfficeSchema, ExtOffice };

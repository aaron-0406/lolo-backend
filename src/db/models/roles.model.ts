import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import customerModel from "./customer.model";

import { RoleType } from "../../app/dash/types/role.type";

const ROLE_TABLE = "ROLE";

const RoleSchema: ModelAttributes<Role, RoleType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_role",
    type: DataTypes.INTEGER,
  },
  name: { type: DataTypes.STRING(150), allowNull: false },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "customer_id_customer",
    references: {
      model: customerModel.CUSTOMER_TABLE,
      key: "id_customer",
    },
  },
};

class Role extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER, { as: "customer" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: ROLE_TABLE,
      timestamps: false,
    };
  }
}
export default { ROLE_TABLE, RoleSchema, Role };

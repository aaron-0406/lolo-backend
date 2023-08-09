import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { ManagementActionType } from "../../app/boss/types/management-action.type";
import customerHasBankModel from "./many-to-many/customer-has-bank.model";

const MANAGEMENT_ACTION_TABLE = "MANAGEMENT_ACTION";

const ManagementActionSchema: ModelAttributes<
  ManagementAction,
  ManagementActionType
> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_management_action",
    type: DataTypes.INTEGER,
  },
  codeAction: {
    allowNull: false,
    field: "code_action",
    type: DataTypes.STRING(10),
  },
  nameAction: {
    allowNull: false,
    field: "name_action",
    type: DataTypes.STRING(150),
  },
  codeSubTypeManagement: {
    allowNull: false,
    field: "code_sub_type_management",
    type: DataTypes.STRING(10),
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

class ManagementAction extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    
    this.belongsTo(models.CUSTOMER_HAS_BANK, { as: "customerHasBank" });

    this.hasMany(models.COMMENT, {
      as: "comment",
      foreignKey: "managementActionId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: MANAGEMENT_ACTION_TABLE,
      modelName: MANAGEMENT_ACTION_TABLE,
      timestamps: false,
    };
  }
}

export default {
  MANAGEMENT_ACTION_TABLE,
  ManagementActionSchema,
  ManagementAction,
};

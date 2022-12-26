import {
  Model,
  DataTypes,
  Sequelize,
  ModelAttributes,
  ModelCtor,
} from "sequelize";
import { CommentType } from "../../app/extrajudicial/types/comment.type";
import clientModel from "./client.model";
import customerUserModel from "./customer-user.model";

const COMMENT_TABLE = "COMMENT";

const CommentSchema: ModelAttributes<Comment, CommentType> = {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id_comment",
    type: DataTypes.INTEGER,
  },
  comment: {
    allowNull: false,
    type: DataTypes.STRING(400),
  },
  negotiation: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  date: {
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  hour: {
    allowNull: false,
    defaultValue: DataTypes.NOW,
    type: DataTypes.DATE,
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

class Comment extends Model {
  static associate(models: { [key: string]: ModelCtor<Model> }) {
    this.belongsTo(models.CUSTOMER_USER, { as: "customer_user" });

    this.belongsTo(models.CLIENT, { as: "client" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: COMMENT_TABLE,
      modelName: COMMENT_TABLE,
      timestamps: false,
    };
  }
}

export default { COMMENT_TABLE, CommentSchema, Comment };

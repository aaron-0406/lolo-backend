import { QueryInterface } from "sequelize";
import commentModel from "../models/comment.model";
import directionModel from "../models/direction.model";
import fileModel from "../models/file.model";
// import guarantorModel from "../models/guarantor.model";
import productModel from "../models/product.model";
import goalUserModel from "../models/goal-user.model";
import goalModel from "../models/goal.model";
import clientModel from "../models/client.model";
import customerUserModel from "../models/customer-user.model";
import ecampoModel from "../models/ecampo.model";
import templateModel from "../models/template.model";
import customerModel from "../models/customer.model";
import templateImgModel from "../models/template-img.model";

const { COMMENT_TABLE } = commentModel;
const { CUSTOMER_USER_TABLE } = customerUserModel;
const { DIRECTION_TABLE } = directionModel;
const { FILE_TABLE } = fileModel;
// const { GUARANTOR_TABLE } = guarantorModel;
const { PRODUCT_TABLE } = productModel;
const { CUSTOMER_TABLE } = customerModel;
const { GOAL_USER_TABLE } = goalUserModel;
const { GOAL_TABLE } = goalModel;
const { CLIENT_TABLE } = clientModel;
const { ECAMPO_TABLE } = ecampoModel;
const { TEMPLATE_TABLE } = templateModel;
const { TEMPLATE_IMG_TABLE } = templateImgModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.removeConstraint(COMMENT_TABLE, "COMMENT_ibfk_2");
  await queryInterface.addConstraint(COMMENT_TABLE, {
    fields: ["client_id_client"],
    type: "foreign key",
    name: "COMMENT_ibfk_2",
    references: {
      table: CLIENT_TABLE,
      field: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.removeConstraint(COMMENT_TABLE, "COMMENT_ibfk_1");
  await queryInterface.addConstraint(COMMENT_TABLE, {
    fields: ["customer_user_id_customer_user"],
    type: "foreign key",
    name: "COMMENT_ibfk_1",
    references: {
      table: CUSTOMER_USER_TABLE,
      field: "id_customer_user",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.removeConstraint(DIRECTION_TABLE, "DIRECTION_ibfk_1");
  await queryInterface.addConstraint(DIRECTION_TABLE, {
    fields: ["client_id_client"],
    type: "foreign key",
    name: "DIRECTION_ibfk_1",
    references: {
      table: CLIENT_TABLE,
      field: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.removeConstraint(ECAMPO_TABLE, "ECAMPO_ibfk_1");
  await queryInterface.addConstraint(ECAMPO_TABLE, {
    fields: ["template_id_template"],
    type: "foreign key",
    name: "ECAMPO_ibfk_1",
    references: {
      table: TEMPLATE_TABLE,
      field: "id_template",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.removeConstraint(FILE_TABLE, "FILE_ibfk_1");
  await queryInterface.addConstraint(FILE_TABLE, {
    fields: ["id_client"],
    type: "foreign key",
    name: "FILE_ibfk_1",
    references: {
      table: CLIENT_TABLE,
      field: "id_client",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.removeConstraint(GOAL_USER_TABLE, "GOAL_USER_ibfk_2");
  await queryInterface.addConstraint(GOAL_USER_TABLE, {
    fields: ["customer_user_id_customer_user"],
    type: "foreign key",
    name: "GOAL_USER_ibfk_2",
    references: {
      table: CUSTOMER_USER_TABLE,
      field: "id_customer_user",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.removeConstraint(GOAL_TABLE, "fk_goal_customer");
  await queryInterface.addConstraint(GOAL_TABLE, {
    fields: ["customer_id_customer"],
    type: "foreign key",
    name: "fk_goal_customer",
    references: {
      table: CUSTOMER_TABLE,
      field: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  // await queryInterface.removeConstraint(GUARANTOR_TABLE, "GUARANTOR_ibfk_1");
  // await queryInterface.addConstraint(GUARANTOR_TABLE, {
  //   fields: ["client_id_client"],
  //   type: "foreign key",
  //   name: "GUARANTOR_ibfk_1",
  //   references: {
  //     table: CLIENT_TABLE,
  //     field: "id_client",
  //   },
  //   onUpdate: "CASCADE",
  //   onDelete: "NO ACTION",
  // });

  await queryInterface.removeConstraint(PRODUCT_TABLE, "PRODUCT_ibfk_2");
  await queryInterface.addConstraint(PRODUCT_TABLE, {
    fields: ["customer_id_customer"],
    type: "foreign key",
    name: "PRODUCT_ibfk_2",
    references: {
      table: CUSTOMER_TABLE,
      field: "id_customer",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });

  await queryInterface.removeConstraint(
    TEMPLATE_IMG_TABLE,
    "TEMPLATE_IMG_ibfk_1"
  );
  await queryInterface.addConstraint(TEMPLATE_IMG_TABLE, {
    fields: ["template_id_template"],
    type: "foreign key",
    name: "TEMPLATE_IMG_ibfk_1",
    references: {
      table: TEMPLATE_TABLE,
      field: "id_template",
    },
    onUpdate: "CASCADE",
    onDelete: "NO ACTION",
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.removeConstraint(COMMENT_TABLE, "COMMENT_ibfk_2");
  await queryInterface.removeConstraint(
    COMMENT_TABLE,
    "customer_user_id_customer_user"
  );
  await queryInterface.removeConstraint(DIRECTION_TABLE, "DIRECTION_ibfk_1");
  await queryInterface.removeConstraint(ECAMPO_TABLE, "template_id_template");
  await queryInterface.removeConstraint(DIRECTION_TABLE, "DIRECTION_ibfk_1");
  await queryInterface.removeConstraint(FILE_TABLE, "FILE_ibfk_1");
  await queryInterface.removeConstraint(
    GOAL_USER_TABLE,
    "fk_goal_user_customer_user"
  );
  await queryInterface.removeConstraint(GOAL_TABLE, "fk_goal_customer");
  // await queryInterface.removeConstraint(GUARANTOR_TABLE, "GUARANTOR_ibfk_1");
  await queryInterface.removeConstraint(PRODUCT_TABLE, "customer_id_customer");
  await queryInterface.removeConstraint(
    TEMPLATE_IMG_TABLE,
    "template_id_template"
  );

  await queryInterface.addConstraint(COMMENT_TABLE, {
    fields: ["client_id_client"],
    type: "foreign key",
    name: "COMMENT_ibfk_2",
    references: {
      table: CLIENT_TABLE,
      field: "id_client",
    },
    onUpdate: "NO ACTION",
    onDelete: "CASCADE",
  });

  await queryInterface.addConstraint(COMMENT_TABLE, {
    fields: ["customer_user_id_customer_user"],
    type: "foreign key",
    name: "customer_user_id_customer_user",
    references: {
      table: CUSTOMER_USER_TABLE,
      field: "id_customer_user",
    },
    onUpdate: "NO ACTION",
    onDelete: "CASCADE",
  });

  await queryInterface.addConstraint(DIRECTION_TABLE, {
    fields: ["client_id_client"],
    type: "foreign key",
    name: "DIRECTION_ibfk_1",
    references: {
      table: CLIENT_TABLE,
      field: "id_client",
    },
    onUpdate: "NO ACTION",
    onDelete: "CASCADE",
  });

  await queryInterface.addConstraint(ECAMPO_TABLE, {
    fields: ["template_id_template"],
    type: "foreign key",
    name: "template_id_template",
    references: {
      table: TEMPLATE_TABLE,
      field: "id_template",
    },
    onUpdate: "NO ACTION",
    onDelete: "CASCADE",
  });

  await queryInterface.addConstraint(FILE_TABLE, {
    fields: ["id_client"],
    type: "foreign key",
    name: "DIRECTION_ibfk_1",
    references: {
      table: CLIENT_TABLE,
      field: "id_client",
    },
    onUpdate: "NO ACTION",
    onDelete: "CASCADE",
  });

  await queryInterface.addConstraint(GOAL_USER_TABLE, {
    fields: ["customer_user_id_customer_user"],
    type: "foreign key",
    name: "fk_goal_user_customer_user",
    references: {
      table: CUSTOMER_USER_TABLE,
      field: "id_customer_user",
    },
    onUpdate: "NO ACTION",
    onDelete: "CASCADE",
  });

  await queryInterface.addConstraint(GOAL_TABLE, {
    fields: ["customer_id_customer"],
    type: "foreign key",
    name: "fk_goal_customer",
    references: {
      table: CUSTOMER_TABLE,
      field: "id_customer",
    },
    onUpdate: "NO ACTION",
    onDelete: "CASCADE",
  });

  // await queryInterface.addConstraint(GUARANTOR_TABLE, {
  //   fields: ["client_id_client"],
  //   type: "foreign key",
  //   name: "GUARANTOR_ibfk_1",
  //   references: {
  //     table: CLIENT_TABLE,
  //     field: "id_client",
  //   },
  //   onUpdate: "NO ACTION",
  //   onDelete: "CASCADE",
  // });

  await queryInterface.addConstraint(PRODUCT_TABLE, {
    fields: ["customer_id_customer"],
    type: "foreign key",
    name: "customer_id_customer",
    references: {
      table: CUSTOMER_TABLE,
      field: "id_customer",
    },
    onUpdate: "NO ACTION",
    onDelete: "CASCADE",
  });

  await queryInterface.addConstraint(TEMPLATE_IMG_TABLE, {
    fields: ["template_id_template"],
    type: "foreign key",
    name: "template_id_template",
    references: {
      table: TEMPLATE_TABLE,
      field: "id_template",
    },
    onUpdate: "NO ACTION",
    onDelete: "CASCADE",
  });
}

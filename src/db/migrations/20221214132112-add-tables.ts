import { QueryInterface } from "sequelize";
import bankModel from "../models/bank.model";
import cityModel from "../models/city.model";
import clientModel from "../models/client.model";
import customerUserModel from "../models/customer-user.model";
import customerModel from "../models/customer.model";
import moduleModel from "../models/module.model";
import userAppModel from "../models/user-app.model";
import customerHasBankModel from "../models/many-to-many/customer-has-bank.model";
import funcionarioModel from "../models/funcionario.model";
import directionModel from "../models/direction.model";
import guarantorModel from "../models/guarantor.model";
import commentModel from "../models/comment.model";

const { BankSchema, BANK_TABLE } = bankModel;
const { CitySchema, CITY_TABLE } = cityModel;
const { ClientSchema, CLIENT_TABLE } = clientModel;
const { CustomerUserSchema, CUSTOMER_USER_TABLE } = customerUserModel;
const { CustomerSchema, CUSTOMER_TABLE } = customerModel;
const { ModuleSchema, MODULE_TABLE } = moduleModel;
const { UserAppSchema, USER_APP_TABLE } = userAppModel;
const { CustomerHasBankSchema, CUSTOMER_HAS_BANK_TABLE } = customerHasBankModel;
const { FuncionarioSchema, FUNCIONARIO_TABLE } = funcionarioModel;
const { DirectionSchema, DIRECTION_TABLE } = directionModel;
const { GuarantorSchema, GUARANTOR_TABLE } = guarantorModel;
const { CommentSchema, COMMENT_TABLE } = commentModel;

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  await queryInterface.createTable(BANK_TABLE, BankSchema);
  await queryInterface.createTable(CITY_TABLE, CitySchema);
  await queryInterface.createTable(CLIENT_TABLE, ClientSchema);
  await queryInterface.createTable(CUSTOMER_USER_TABLE, CustomerUserSchema);
  await queryInterface.createTable(MODULE_TABLE, ModuleSchema);
  await queryInterface.createTable(USER_APP_TABLE, UserAppSchema);
  await queryInterface.createTable(FUNCIONARIO_TABLE, FuncionarioSchema);
  await queryInterface.createTable(DIRECTION_TABLE, DirectionSchema);
  await queryInterface.createTable(GUARANTOR_TABLE, GuarantorSchema);
  await queryInterface.createTable(COMMENT_TABLE, CommentSchema);

  await queryInterface.createTable(
    CUSTOMER_HAS_BANK_TABLE,
    CustomerHasBankSchema
  );
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable(CUSTOMER_TABLE);
  await queryInterface.dropTable(BANK_TABLE);
  await queryInterface.dropTable(CITY_TABLE);
  await queryInterface.dropTable(CLIENT_TABLE);
  await queryInterface.dropTable(CUSTOMER_USER_TABLE);
  await queryInterface.dropTable(MODULE_TABLE);
  await queryInterface.dropTable(USER_APP_TABLE);
  await queryInterface.dropTable(FUNCIONARIO_TABLE);
  await queryInterface.dropTable(DIRECTION_TABLE);
  await queryInterface.dropTable(GUARANTOR_TABLE);
  await queryInterface.dropTable(COMMENT_TABLE);

  await queryInterface.dropTable(CUSTOMER_HAS_BANK_TABLE);
}

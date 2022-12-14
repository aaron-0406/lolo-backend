import { Sequelize } from "sequelize";
import banksModel from "./bank.model";
import customerModel from "./customer.model";
import moduleModel from "./module.model";
import customerUserModel from "./customer-user.model";
import cityModel from "./city.model";
import clientModel from "./client.model";
import userAppModel from "./user-app.model";
import customerHasBank from "./many-to-many/customer-has-bank.model";
import funcionarioModel from "./funcionario.model";
import directionModel from "./direction.model";
import guarantorModel from "./guarantor.model";
import commentModel from "./comment.model";
import fileModel from "./file.model";

const { Customer, CustomerSchema } = customerModel;
const { Funcionario, FuncionarioSchema } = funcionarioModel;
const { Bank, BankSchema } = banksModel;
const { Module, ModuleSchema } = moduleModel;
const { CustomerUser, CustomerUserSchema } = customerUserModel;
const { City, CitySchema } = cityModel;
const { Client, ClientSchema } = clientModel;
const { UserApp, UserAppSchema } = userAppModel;
const { Direction, DirectionSchema } = directionModel;
const { Guarantor, GuarantorSchema } = guarantorModel;
const { Comment, CommentSchema } = commentModel;
const { File, FileSchema } = fileModel;

const { CustomerHasBank, CustomerHasBankSchema } = customerHasBank;

export const setupModels = (sequelize: Sequelize) => {
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Funcionario.init(FuncionarioSchema, Funcionario.config(sequelize));
  Bank.init(BankSchema, Bank.config(sequelize));
  Module.init(ModuleSchema, Module.config(sequelize));
  CustomerUser.init(CustomerUserSchema, CustomerUser.config(sequelize));
  City.init(CitySchema, City.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));
  File.init(FileSchema, File.config(sequelize));
  UserApp.init(UserAppSchema, UserApp.config(sequelize));
  Direction.init(DirectionSchema, Direction.config(sequelize));
  Guarantor.init(GuarantorSchema, Guarantor.config(sequelize));
  Comment.init(CommentSchema, Comment.config(sequelize));
  CustomerHasBank.init(
    CustomerHasBankSchema,
    CustomerHasBank.config(sequelize)
  );

  Customer.associate(sequelize.models);
  CustomerUser.associate(sequelize.models);
  Bank.associate(sequelize.models);
  Funcionario.associate(sequelize.models);
  City.associate(sequelize.models);
  Client.associate(sequelize.models);
  File.associate(sequelize.models);
  Comment.associate(sequelize.models);
  Direction.associate(sequelize.models);
  Guarantor.associate(sequelize.models);
};

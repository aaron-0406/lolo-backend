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

const { Customer, CustomerSchema } = customerModel;
const { Bank, BankSchema } = banksModel;
const { Module, ModuleSchema } = moduleModel;
const { CustomerUser, CustomerUserSchema } = customerUserModel;
const { City, CitySchema } = cityModel;
const { Client, ClientSchema } = clientModel;
const { UserApp, UserAppSchema } = userAppModel;
const { Funcionario, FuncionarioSchema } = funcionarioModel;
const { Direction, DirectionSchema } = directionModel;
const { Guarantor, GuarantorSchema } = guarantorModel;

const { CustomerHasBank, CustomerHasBankSchema } = customerHasBank;

export const setupModels = (sequelize: Sequelize) => {
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Bank.init(BankSchema, Bank.config(sequelize));
  Module.init(ModuleSchema, Module.config(sequelize));
  CustomerUser.init(CustomerUserSchema, CustomerUser.config(sequelize));
  City.init(CitySchema, City.config(sequelize));
  Client.init(ClientSchema, Client.config(sequelize));
  UserApp.init(UserAppSchema, UserApp.config(sequelize));
  Funcionario.init(FuncionarioSchema, Funcionario.config(sequelize));
  Direction.init(DirectionSchema, Direction.config(sequelize));
  Guarantor.init(GuarantorSchema, Guarantor.config(sequelize));

  CustomerHasBank.init(
    CustomerHasBankSchema,
    CustomerHasBank.config(sequelize)
  );

  Customer.associate(sequelize.models);
  CustomerUser.associate(sequelize.models);
  Bank.associate(sequelize.models);
  Funcionario.associate(sequelize.models);
};

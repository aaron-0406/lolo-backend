import { Sequelize } from "sequelize";
import banksModel from "./bank.model";
import customerModel from "./customer.model";
import moduleModel from "./module.model";
import customerUserModel from "./customer-user.model";
import customerHasBank from "./many-to-many/customer-has-bank";

const { Customer, CustomerSchema } = customerModel;
const { Bank, BankSchema } = banksModel;
const { Module, ModuleSchema } = moduleModel;
const { CustomerUser, CustomerUserSchema } = customerUserModel;

const { CustomerHasBank, CustomerHasBankSchema } = customerHasBank;

export const setupModels = (sequelize: Sequelize) => {
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Bank.init(BankSchema, Bank.config(sequelize));
  Module.init(ModuleSchema, Module.config(sequelize));
  CustomerUser.init(CustomerUserSchema, CustomerUser.config(sequelize));

  CustomerHasBank.init(
    CustomerHasBankSchema,
    CustomerHasBank.config(sequelize)
  );

  Customer.associate(sequelize.models);
  CustomerUser.associate(sequelize.models);
};

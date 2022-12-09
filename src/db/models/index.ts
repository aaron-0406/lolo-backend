import { Sequelize } from "sequelize";
import banksModel from "./banks.model";
import customerModel from "./customer.model";
import moduleModel from "./module.model";

const { Customer, CustomerSchema } = customerModel;
const { Bank, BankSchema } = banksModel;
const { Module, ModuleSchema } = moduleModel;

export const setupModels = (sequelize: Sequelize) => {
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Bank.init(BankSchema, Bank.config(sequelize));
  Module.init(ModuleSchema, Module.config(sequelize));
};
